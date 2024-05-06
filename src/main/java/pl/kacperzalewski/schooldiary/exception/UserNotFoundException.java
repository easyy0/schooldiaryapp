package pl.kacperzalewski.schooldiary.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) {
        super(message);
    }
}
