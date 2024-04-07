package app.security;


import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = PasswordValidator.PasswordValidatorImpl.class)
public @interface PasswordValidator {

    String message() default "Invalid password";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class PasswordValidatorImpl implements ConstraintValidator<PasswordValidator, String> {

        @Override
        public void initialize(PasswordValidator constraintAnnotation) {
            // Initialization, if needed
        }

        @Override
        public boolean isValid(String password, ConstraintValidatorContext context) {
            if (password == null) {
                return false;
            }

            // Password must be at least 8 characters
            if (password.length() < 8) {
                return false;
            }

            // Password must contain at least 1 uppercase letter
            if (!containsUppercase(password)) {
                return false;
            }

            // Password must contain at least 1 lowercase letter
            if (!containsLowercase(password)) {
                return false;
            }

            return true;
        }

        private boolean containsUppercase(String password) {
            for (char c : password.toCharArray()) {
                if (Character.isUpperCase(c)) {
                    return true;
                }
            }
            return false;
        }

        private boolean containsLowercase(String password) {
            for (char c : password.toCharArray()) {
                if (Character.isLowerCase(c)) {
                    return true;
                }
            }
            return false;
        }
    }
}

