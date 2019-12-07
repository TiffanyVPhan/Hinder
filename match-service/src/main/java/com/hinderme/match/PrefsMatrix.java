package com.hinderme.match;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// TODO make thread safe

public class PrefsMatrix {
    private final int features;
    private final List<double[]> prefMatrix = new ArrayList<>();
    private final List<double[]> prefNormMatrix = new ArrayList<>();

    public PrefsMatrix(int features) {
        this.features = features;
    }

    public int getFeatures() {
        return features;
    }

    public List<double[]> getPrefMatrix() {
        return prefMatrix;
    }

    public List<double[]> getPrefNormMatrix() {
        return prefNormMatrix;
    }

    // returns the new person's id (or -1 in error)
    public Optional<Integer> addRow(double[] prefs) {
        if (prefs.length != features) {
            return Optional.empty();
        }

        prefMatrix.add(prefs);
        prefNormMatrix.add(normalize(prefs));

        return Optional.of(prefMatrix.size() - 1);
    }

    public boolean updateRow(int id, double[] prefs) {
        if (id >= 0 && id < prefMatrix.size() && prefs.length == features) {
            prefMatrix.set(id, prefs);
            prefNormMatrix.set(id, normalize(prefs));
            return true;
        }

        return false;
    }

    public Optional<double[]> getRow(int id) {
        if (id >= 0 && id < prefMatrix.size()) {
            return Optional.of(prefMatrix.get(id));
        }

        return Optional.empty();
    }

    public Optional<Integer> findMatch(int id) {
        if (id < 0 || id >= prefMatrix.size()) {
            return Optional.empty();
        }

        double[] person = prefMatrix.get(id);

        int row = -1;
        double lowestDot = Double.MAX_VALUE;

        for (int i = 0; i < prefMatrix.size(); i++) {
            // we don't want to match a person with themselves
            if (i == id) {
                continue;
            }

            double match = dot(person, prefMatrix.get(i));

            if (match < lowestDot) {
                lowestDot = match;
                row = i;
            }
        }

        return Optional.of(row);
    }

    public static double dot(double[] a, double[] b) {
        assert a.length == b.length;

        double result = 0;
        for (int i = 0; i < a.length; i++) {
            result += a[i] * b[i];
        }

        return result;
    }

    public static double[] normalize(double[] vec) {
        double norm = Math.sqrt(dot(vec, vec));
        double[] ret = new double[vec.length];

        if (norm == 0.0) {
            return ret; // vec is a zero vector
        }

        for (int i = 0; i < vec.length; i++) {
            ret[i] = vec[i] / norm;
        }

        return ret;
    }
}
