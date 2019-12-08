package com.hinderme.match;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static spark.Spark.*;

public class MatchServer {
    public static void main(String[] args) {
        int p = 8080;
        if (args.length > 1) {
            p = Integer.parseInt(args[1]);
        }

        port(p);

        int features = Integer.parseInt(args[0]);
        PrefsMatrix prefsMatrix = new PrefsMatrix(features);

        get("/create/:prefs", (req, res) -> {
            Optional<double[]> prefs = parseDoubleList(req.params("prefs"));

            if (prefs.isPresent()) {
                Optional<Integer> userId = prefsMatrix.addRow(prefs.get());
                if (userId.isPresent()) {
                    res.status(200);
                    return successJson(String.valueOf(userId.get()));
                }
            }

            res.status(400);
            return errorJson("Failed to create user from given preferences.");
        });

        get("/prefs/:userId/:prefs", (req, res) -> {
            Optional<Integer> id = parseInt(req.params("userId"));
            Optional<double[]> prefs = parseDoubleList(req.params("prefs"));

            if (id.isPresent() && prefs.isPresent()) {
                boolean ok = prefsMatrix.updateRow(id.get(), prefs.get());
                if (ok) {
                    res.status(200);
                    return successJson("Preferences have been updated.");
                }
            }

            res.status(400);
            return errorJson("Bad user or preferences list.");
        });

        get("/prefs/:userId", (req, res) -> {
           Optional<Integer> id = parseInt(req.params("userId"));

           if (id.isPresent()) {
               Optional<double[]> userPrefs = prefsMatrix.getRow(id.get());
               if (userPrefs.isPresent()) {
                   res.status(200);
                   String prefsStr = toDoubleList(userPrefs.get());
                   return successJson(prefsStr);
               }
           }

           res.status(404);
           return errorJson("User not found.");
        });

        get("/prefs/top/:topN/:offset/:userId", (req, res) -> {
            Optional<Integer> topN = parseInt(req.params("topN"));
            Optional<Integer> offset = parseInt(req.params("offset"));
            Optional<Integer> userId = parseInt(req.params("userId"));

            if (topN.isPresent() && offset.isPresent() && userId.isPresent()) {
                Optional<int[]> matches = prefsMatrix.getTopMatches(topN.get(), offset.get(), userId.get());

                if (matches.isPresent()) {
                    return successJson(Arrays.toString(matches.get()));
                }
            }

            res.status(400);
            return errorJson("Cannot get top-N results.");
        });

        /*
                        integration-ish tests below lmao
         */

        post("/debug/seed/:count", (req, res) -> {
            Optional<Integer> count = parseInt(req.params("count"));

            if (count.isPresent()) {
                for (int i = 0; i < count.get(); i++) {
                    double[] rands = new double[prefsMatrix.getFeatures()];
                    for (int r = 0; r < rands.length; r++) {
                        rands[r] = Math.random() * 2 - 1;
                    }

                    prefsMatrix.addRow(rands);
                }

                return successJson("Added " + count.get() + " random rows.");
            }

            return errorJson("Failed to seed db.");
        });

        post("/debug/allPrefs", (req, res) -> stringifyMatrix(prefsMatrix.getPrefMatrix()));

        post("/debug/allNormPrefs", (req, res) -> stringifyMatrix(prefsMatrix.getPrefNormMatrix()));

        post("/debug/dot/:v1/:v2", (req, res) -> {
            Optional<double[]> v1 = parseDoubleList(req.params("v1"));
            Optional<double[]> v2 = parseDoubleList(req.params("v2"));

            if (v1.isPresent() && v2.isPresent() && v1.get().length == v2.get().length) {
                double product = PrefsMatrix.dot(v1.get(), v2.get());
                return successJson(Double.toString(product));
            }

            return errorJson("Need 2 vectors of same length.");
        });

        post("/debug/norm/:v", (req, res) -> {
            Optional<double[]> vec = parseDoubleList(req.params("v"));
            if (vec.isPresent()) {
                double[] norm = PrefsMatrix.normalize(vec.get());
                return successJson(toDoubleList(norm));
            }

            return errorJson("Needs a vector.");
        });
    }

    private static Optional<Double> parseDouble(String s) {
        try {
            return Optional.of(Double.parseDouble(s));
        } catch (Exception ignored) {
            return Optional.empty();
        }
    }

    private static Optional<Integer> parseInt(String s) {
        try {
            return Optional.of(Integer.parseInt(s));
        } catch (Exception ignored) {
            return Optional.empty();
        }
    }

    // String: "d1,d2,d3" -> double[]: [d1,d2,d3]
    private static Optional<double[]> parseDoubleList(String s) {
        if (s == null) {
            return Optional.empty();
        }

        String[] split = s.split(",");
        double[] xs = new double[split.length];

        for (int i = 0; i < split.length; i++) {
            Optional<Double> val = parseDouble(split[i]);
            if (val.isPresent()) {
                xs[i] = val.get();
            } else {
                // exit early b/c parse failed in middle of list
                return Optional.empty();
            }
        }

        return Optional.of(xs);
    }

    private static String toDoubleList(double[] xs) {
        StringBuilder sb = new StringBuilder();

        for (double x : xs) {
            sb.append(x).append(',');
        }

        if (sb.length() > 0) {
            // remove final ','
            sb.setLength(sb.length() - 1);
        }

        return sb.toString();
    }

    private static String successJson(String msg) {
        return "{\"success\":\"" + msg + "\"}";
    }

    private static String errorJson(String msg) {
        return "{\"error\":\"" + msg + "\"}";
    }

    private static String stringifyMatrix(List<double[]> mat) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < mat.size(); i++) {
            sb.append(i)
              .append(": ")
              .append(toDoubleList(mat.get(i)))
              .append('\n');
        }

        return sb.toString();
    }
}
