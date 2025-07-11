import clsx from "clsx";

import { config } from "@shared/config/config";
import { CheckCircle, XCircle } from "lucide-react";

export const getPasswordChecks = (password: string) => {
  const rules = config.user.passwordRules;

  return [
    {
      label: "At least " + rules.minLength + " characters",
      isValid: password.length >= rules.minLength,
    },
    {
      label: "Uppercase letter",
      isValid: !rules.requireUppercase || /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter",
      isValid: !rules.requireLowercase || /[a-z]/.test(password),
    },
    {
      label: "Number",
      isValid: !rules.requireNumber || /[0-9]/.test(password),
    },
    {
      label: "Special character",
      isValid: !rules.requireSymbol || /[^a-zA-Z0-9]/.test(password),
    },
  ];
};


type Props = {
  password: string;
};

const PasswordStrengthChecks: React.FC<Props> = ({ password }) => {
  const checks = getPasswordChecks(password);

  return (
    <div className="grid grid-cols-3 gap-2">
      {checks.map((check, index) => (
        <div key={index} className="flex items-center gap-2">
          {check.isValid ? (
            <CheckCircle className="text-green-500 w-3 h-3" />
          ) : (
            <XCircle className="text-red-500 w-3 h-3" />
          )}
          <span
            className={clsx("transition-colors text-xs", {
              "text-green-600": check.isValid,
              "text-red-500": !check.isValid,
            })}
          >
            {check.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordStrengthChecks;
