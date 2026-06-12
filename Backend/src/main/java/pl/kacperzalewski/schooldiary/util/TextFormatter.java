package pl.kacperzalewski.schooldiary.util;

public class TextFormatter {

    public static String getFirstLetterFromString(String text) {
        if (text == null || text.isEmpty()) {
            throw new IllegalArgumentException("Text cannot be null or empty");
        }
        return text.substring(0, 1);
    }
}
