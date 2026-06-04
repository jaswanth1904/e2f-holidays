import fs from 'fs';
import path from 'path';

function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.jsx') || p.endsWith('.js')) {
            let c = fs.readFileSync(p, 'utf8');
            let original = c;
            
            // Replace strings like 'http://localhost:5000/api...'
            // with `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api...`
            c = c.replace(/['"`]http:\/\/localhost:5000(.*?)['"`]/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");

            if (c !== original) {
                fs.writeFileSync(p, c);
                console.log(`Updated ${p}`);
            }
        }
    });
}

walk('c:/Users/Jaswanth/Desktop/e2f-holidays/frontend/src');
