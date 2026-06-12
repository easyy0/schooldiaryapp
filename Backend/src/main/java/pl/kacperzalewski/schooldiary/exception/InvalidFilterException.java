package pl.kacperzalewski.schooldiary.exception;

public class InvalidFilterException extends RuntimeException {
    public InvalidFilterException(String message) {
        super(message);
    }
}
