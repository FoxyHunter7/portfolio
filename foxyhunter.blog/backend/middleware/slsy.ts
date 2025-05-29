import { Slsy } from "@ventgrey/slsy";
import { Context, Next } from "@oak/oak";

// Export configured Slsy instance
const slsy = new Slsy({
    crossdomain: { permittedPolicies: 'master-only' },
    dontSniffMimetype: true,
    frameguard: { action: "deny" },
    hidePoweredBy: null,
    hsts: { includeSubDomains: true }
});

// Export middleware wrapper
export default async (ctx: Context, next: Next) => {
    await next();
    slsy.slsy(ctx.request, ctx.response);
};
