package app.validator;

import app.service.UserService;
import app.utils.ValidationUtils;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    private final UserService userService;

    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (userService.isEmailExisting(email)) {
            String errorMessage = String.format("Email must be unique. This email: '%s' is already taken.", email);
            ValidationUtils.addConstraintViolation(errorMessage, context);
            return false;
        }

        return true;
    }

}
