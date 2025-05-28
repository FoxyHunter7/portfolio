import { Application } from '@oak/oak'
import { Slsy } from '@ventgrey/slsy'
import { DOMPurify } from 'dompurify'
import { marked } from 'marked'

const app = new Application();

const slsy: Slsy = new Slsy({
    crossdomain: { permittedPolicies: 'same-origin' },
    dontSniffMimetype: true,
    frameguard: { action: "deny" },
    hidePoweredBy: null,
    hsts: { includeSubDomains: true }
});