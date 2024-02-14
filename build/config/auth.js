import { defineConfig } from '@adonisjs/auth';
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens';
const authConfig = defineConfig({
    default: 'api_admin',
    guards: {
        api_admin: tokensGuard({
            provider: tokensUserProvider({
                tokens: 'accessTokens',
                model: () => import('#models/admin'),
            })
        }),
        api_two: tokensGuard({
            provider: tokensUserProvider({
                tokens: 'accessTokens',
                model: () => import('#models/admin'),
            })
        }),
    },
});
export default authConfig;
//# sourceMappingURL=auth.js.map