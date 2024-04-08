package app.security.jpa;


public class UserException extends RuntimeException {
    // Constructors
    public UserException(String message) {
        super(message);
    }

    public UserException(String message, Throwable cause) {
        super(message, cause);
    }


    public void logError() {
        // Example: Logging the error message
        System.err.println("User exception occurred: " + getMessage());
    }
}