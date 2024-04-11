package app.configuration;


import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.Target;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

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

        // Password must be at least 8 characters
        // Password must contain at least 1 uppercase letter
        @Override
        public boolean isValid(String password, ConstraintValidatorContext context) {
            if (password == null || password.length() < 8 || !containsUppercase(password)) {
                return false;
            }
            // Password must contain at least 1 lowercase letter
            return containsLowercase(password);
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

