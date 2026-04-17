/* js/components.js */

document.addEventListener("DOMContentLoaded", () => {
    // Determine the root path relative to the current HTML file
    // by finding the link to style.css which is always in the head.
    const styleLink = document.querySelector('link[href$="style.css"]');
    let rootPath = "";
    if (styleLink) {
        rootPath = styleLink.getAttribute("href").replace("style.css", "");
    }

    // Inject favicon globally
    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = rootPath + 'images/common/UEL_Logo final-09.png';
        document.head.appendChild(favicon);
    }

    const headerHTML = `
    <nav>
        <a href="${rootPath}index.html" class="logo"><img src="${rootPath}images/common/uel_logo.png" alt="UEL & RLS"><span class="logo-text">Feminist Legal Theory Project</span></a>
        <ul class="nav-links">
            <li><a href="${rootPath}index.html">Home</a></li>
            <li><a href="${rootPath}about/about.html">About Us</a></li>
            <li class="nav-dropdown">
                <a href="${rootPath}works/" class="nav-dropdown-toggle">Our Works <span class="nav-caret" aria-hidden="true"></span></a>
                <ul class="nav-dropdown-menu">
                    <li><a href="${rootPath}works/feminist-judgments/">Feminist Judgments</a></li>
                    <li><a href="${rootPath}works/icfgl/">International Conference on Feminism, Gender and Law</a></li>
                    <li><a href="${rootPath}works/publications/">Publications</a></li>
                    <li><a href="${rootPath}works/workshops/">Workshops &amp; Seminars</a></li>
                    <li><a href="${rootPath}works/moot-court/">Gender Justice Moot Court</a></li>
                </ul>
            </li>
            <li><a href="${rootPath}contact/contact.html">Contact Us</a></li>
        </ul>
    </nav>
    `;

    const footerHTML = `
    <div class="site-footer-wrap">
        <footer class="site-footer">
            <div class="site-footer-inner">
                <div class="site-footer-top">
                    <div class="site-footer-col site-footer-brand">
                        <h4>About The Project</h4>
                        <p>Integrating Feminist Legal Theory into Legal Education, Research and Practice. A collaborative initiative to advance social justice and gender equality within the Vietnamese legal landscape.</p>
                        <img src="${rootPath}images/common/uel_logo.png" alt="UEL Logo">
                    </div>
                    <div class="site-footer-col">
                        <h4>Quick Links</h4>
                        <ul class="site-footer-links">
                            <li><a href="${rootPath}index.html">Home</a></li>
                            <li><a href="${rootPath}about/about.html">About Us</a></li>
                            <li><a href="${rootPath}works/">Our Works</a></li>
                            <li><a href="${rootPath}contact/contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="site-footer-col site-footer-contact">
                        <h4>Contact Information</h4>
                        <p class="site-footer-title">University of Economics and Law (UEL), <span style="white-space: nowrap;">VNU-HCM</span><br>Feminist Legal Theory Project</p>
                        <p>669 Do Muoi Street, Quarter 6 (formerly Quarter 3), Linh Xuan Ward, Ho Chi Minh City, Vietnam</p>
                        <p><span class="site-footer-title">Email Inquiries</span><br><a href="mailto:feminist.project@uel.edu.vn" class="site-footer-email">feminist.project@uel.edu.vn</a></p>
                    </div>
                </div>
                <div class="site-footer-bottom">
                    <div class="site-footer-bottom-grid">
                        <p>&copy; 2024 UEL Feminist Legal Theory Project. Supported by Rosa Luxemburg Stiftung Southeast Asia.</p>
                        <p>Designed for Academic Excellence</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    `;

    const headerPlaceholder = document.getElementById("global-header");
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
        
        // Highlight active nav link without marking every nested Works item.
        const normalizePath = (path) => {
            let normalized = path.replace(/\\/g, "/").replace(/\/index\.html$/, "/");
            if (!normalized.endsWith("/") && !normalized.split("/").pop().includes(".")) {
                normalized += "/";
            }
            return normalized;
        };

        const currentPath = normalizePath(window.location.pathname);
        const siteRootPath = normalizePath(new URL(rootPath || "./", window.location.href).pathname);
        const toSiteRelative = (path) => {
            const normalized = normalizePath(path);
            return normalized.startsWith(siteRootPath)
                ? normalized.slice(siteRootPath.length)
                : normalized.replace(/^\/+/, "");
        };
        const currentRelativePath = toSiteRelative(currentPath);
        const navLinks = headerPlaceholder.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref || linkHref === "#") return;

            const linkPath = normalizePath(new URL(linkHref, window.location.href).pathname);
            const linkRelativePath = toSiteRelative(linkPath);
            const isDropdownToggle = link.classList.contains("nav-dropdown-toggle");
            const isHome = linkRelativePath === "" || linkRelativePath === "index.html";
            const isCurrent =
                (isHome && currentRelativePath === "") ||
                (!isHome && currentRelativePath === linkRelativePath) ||
                (!isHome && !isDropdownToggle && currentRelativePath.startsWith(linkRelativePath)) ||
                (isDropdownToggle && currentRelativePath.startsWith("works/"));

            if (isCurrent) {
                link.classList.add("nav-current");
            }
        });
    }

    const footerPlaceholder = document.getElementById("global-footer");
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
});
