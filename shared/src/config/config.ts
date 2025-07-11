export const config = {
    user: {
        allowedUpdates: ['username', 'email', 'password', 'emailVerified'],
        passwordRules: {
            minLength: 6,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            requireSymbol: true,
          },
    },
    providers: {
        google: true,
        github: false,
        facebook: false,
        twitter: false,
        linkedin: false,
        instagram: false,
    }
}