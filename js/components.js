/* js/components.js */

document.addEventListener("DOMContentLoaded", () => {
    // Determine the root path relative to the current HTML file
    // by finding the link to style.css which is always in the head.
    const styleLink = document.querySelector('link[href$="style.css"]');
    let rootPath = "";
    if (styleLink) {
        rootPath = styleLink.getAttribute("href").replace("style.css", "");
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
                        <p>669 National Highway 1, Linh Xuan Ward, Thu Duc City, Ho Chi Minh City, Vietnam</p>
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
        
        // Highlight active nav link
        const currentPath = window.location.pathname;
        const navLinks = headerPlaceholder.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref !== "#") {
                // Determine if this link represents the current page directory
                // It's a simple match for the directory name
                const linkDir = linkHref.replace(rootPath, "").split('/')[0];
                const currentPageMatches = currentPath.includes(linkDir) && linkDir !== "";
                
                // Very basic active state matching
                if (link.href === window.location.href || 
                   (currentPageMatches && linkDir !== "index.html") || 
                   (currentPath.endsWith('index.html') && linkDir === "index.html" && currentPath.split('/').slice(-2)[0] === "rls") ) {
                    link.classList.add("nav-current");
                }
            }
        });
    }

    const footerPlaceholder = document.getElementById("global-footer");
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
});
