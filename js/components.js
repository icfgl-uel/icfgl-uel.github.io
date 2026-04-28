/* js/components.js — shared header/footer with English (US) / Vietnamese */

(function () {
    const STRINGS = {
        en: {
            logoAlt: "UEL & RLS",
            logoText: "Feminist Legal Theory Project",
            navHome: "Home",
            navAbout: "About Us",
            navWorks: "Our Works",
            navFeministJudgments: "Feminist Judgments",
            navIcfgl: "International Conference on Feminism, Gender and Law",
            navPublications: "Publications",
            navWorkshops: "Workshops & Seminars",
            navMootCourt: "Gender Justice Moot Court",
            navContact: "Contact Us",
            langSwitcherLabel: "Language",
            langMenuButton: "Choose language",
            langEn: "English (US)",
            langVi: "Tiếng Việt",
            langFlagEn: "\u{1F1FA}\u{1F1F8}",
            langFlagVi: "\u{1F1FB}\u{1F1F3}",
            footerAboutTitle: "About The Project",
            footerAboutBody:
                "Integrating Feminist Legal Theory into Legal Education, Research and Practice. A collaborative initiative to advance social justice and gender equality within the Vietnamese legal landscape.",
            footerQuickTitle: "Quick Links",
            footerContactTitle: "Contact Information",
            footerOrgTitle:
                'University of Economics and Law (UEL), <span style="white-space: nowrap;">VNU-HCM</span><br>Feminist Legal Theory Project',
            footerAddress:
                "669 Do Muoi Street, Quarter 6 (formerly Quarter 3), Linh Xuan Ward, Ho Chi Minh City, Vietnam",
            footerEmailLabel: "Email Inquiries",
            footerCopyright:
                "&copy; 2024 UEL Feminist Legal Theory Project. Supported by Rosa Luxemburg Stiftung Southeast Asia.",
            footerTagline: "Designed for Academic Excellence",
            logoImgAlt: "UEL Logo",
        },
        vi: {
            logoAlt: "UEL & RLS",
            logoText: "Dự án Lý luận Pháp lý Nữ quyền",
            navHome: "Trang chủ",
            navAbout: "Giới thiệu",
            navWorks: "Hoạt động & Công trình",
            navFeministJudgments: "Bản án nữ quyền",
            navIcfgl: "Hội thảo Quốc tế về Nữ quyền, Giới và Pháp luật",
            navPublications: "Ấn phẩm",
            navWorkshops: "Hội thảo & Tọa đàm",
            navMootCourt: "Phiên tòa giả định Công lý giới",
            navContact: "Liên hệ",
            langSwitcherLabel: "Ngôn ngữ",
            langMenuButton: "Chọn ngôn ngữ",
            langEn: "English (US)",
            langVi: "Tiếng Việt",
            langFlagEn: "\u{1F1FA}\u{1F1F8}",
            langFlagVi: "\u{1F1FB}\u{1F1F3}",
            footerAboutTitle: "Về dự án",
            footerAboutBody:
                "Đưa lý luận pháp lý nữ quyền vào đào tạo, nghiên cứu và thực tiễn pháp lý. Sáng kiến hợp tác nhằm thúc đẩy công bằng xã hội và bình đẳng giới trong bối cảnh pháp lý Việt Nam.",
            footerQuickTitle: "Liên kết nhanh",
            footerContactTitle: "Thông tin liên hệ",
            footerOrgTitle:
                'Trường Đại học Kinh tế – Luật (UEL), <span style="white-space: nowrap;">ĐHQG-HCM</span><br>Dự án Lý luận Pháp lý Nữ quyền',
            footerAddress:
                "669 Đường Đỗ Mười, Khu phố 6 (trước đây là Khu phố 3), Phường Linh Xuân, TP. Hồ Chí Minh, Việt Nam",
            footerEmailLabel: "Email liên hệ",
            footerCopyright:
                "&copy; 2024 Dự án Lý luận Pháp lý Nữ quyền – UEL. Được hỗ trợ bởi Rosa Luxemburg Stiftung Đông Nam Á.",
            footerTagline: "Thiết kế vì chất lượng học thuật",
            logoImgAlt: "Logo UEL",
        },
    };

    /** Path segments after leading slash, decoded */
    function pathnameSegments() {
        try {
            return decodeURI(window.location.pathname)
                .split("/")
                .filter(Boolean);
        } catch {
            return window.location.pathname.split("/").filter(Boolean);
        }
    }

    /** Vietnamese locale if path contains segment `vi` as locale root ( /vi/… or /{repo}/vi/… ) */
    function isVietnameseLocale() {
        const parts = pathnameSegments();
        if (parts[0] === "vi") return true;
        if (parts.length >= 2 && parts[1] === "vi") return true;
        return false;
    }

    /** Site-relative path without locale segment `vi` (supports `/vi/…` and `…/repo/vi/…`). */
    function stripViPrefix(rel) {
        if (!rel) return "";
        let r = rel.replace(/\\/g, "/").replace(/\/+$/, "");
        const sub = "/vi/";
        const i = r.indexOf(sub);
        if (i !== -1) {
            const tail = r.slice(i + sub.length);
            return tail || "";
        }
        if (r === "vi" || r === "vi/index.html") return "";
        if (r.startsWith("vi/")) return r.slice(3);
        return r;
    }

    /** Build path to the same page in the other locale (EN ↔ VI mirror under `vi/`). */
    function alternateLocaleHref(rootPath, currentSiteRelative) {
        const raw = (currentSiteRelative || "").replace(/\/+$/, "");
        const withoutVi = stripViPrefix(raw);
        const isHome =
            !withoutVi ||
            withoutVi === "index.html" ||
            raw === "vi" ||
            raw === "vi/index.html";

        return {
            en: isHome ? rootPath + "index.html" : rootPath + withoutVi,
            vi: isHome ? rootPath + "vi/index.html" : rootPath + "vi/" + withoutVi,
        };
    }

    document.addEventListener("DOMContentLoaded", () => {
        const styleLink = document.querySelector('link[href$="style.css"]');
        let rootPath = "";
        if (styleLink) {
            rootPath = styleLink.getAttribute("href").replace("style.css", "");
        }

        const vi = isVietnameseLocale();
        const t = vi ? STRINGS.vi : STRINGS.en;

        const localePrefix = vi ? "vi/" : "";

        const homeHref = rootPath + localePrefix + "index.html";
        const aboutHref = rootPath + localePrefix + "about/about.html";
        const worksHref = rootPath + localePrefix + "works/";
        const fjHref = rootPath + localePrefix + "works/feminist-judgments/";
        const icfglHref = rootPath + localePrefix + "works/icfgl/";
        const pubHref = rootPath + localePrefix + "works/publications/";
        const wsHref = rootPath + localePrefix + "works/workshops/";
        const mootHref = rootPath + localePrefix + "works/moot-court/";
        const contactHref = rootPath + localePrefix + "contact/contact.html";

        const normalizePath = (path) => {
            let normalized = path.replace(/\\/g, "/").replace(/\/index\.html$/i, "/");
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
                ? normalized.slice(siteRootPath.length).replace(/^\/+/, "")
                : normalized.replace(/^\/+/, "");
        };
        const currentRelativePathRaw = toSiteRelative(currentPath);
        const currentRelativePath = currentRelativePathRaw.replace(/\/$/, "") || "";
        const pathForNav = stripViPrefix(currentRelativePath);
        const alt = alternateLocaleHref(rootPath, currentRelativePath);
        const enHref = alt.en;
        const viHref = alt.vi;

        const headerHTML = `
    <nav>
        <a href="${homeHref}" class="logo"><img src="${rootPath}images/common/uel_logo.png" alt="${t.logoAlt}"><span class="logo-text">${t.logoText}</span></a>
        <ul class="nav-links">
            <li><a href="${homeHref}">${t.navHome}</a></li>
            <li><a href="${aboutHref}">${t.navAbout}</a></li>
            <li class="nav-dropdown">
                <a href="${worksHref}" class="nav-dropdown-toggle">${t.navWorks} <span class="nav-caret" aria-hidden="true"></span></a>
                <ul class="nav-dropdown-menu">
                    <li><a href="${fjHref}">${t.navFeministJudgments}</a></li>
                    <li><a href="${icfglHref}">${t.navIcfgl}</a></li>
                    <li><a href="${pubHref}">${t.navPublications}</a></li>
                    <li><a href="${wsHref}">${t.navWorkshops}</a></li>
                    <li><a href="${mootHref}">${t.navMootCourt}</a></li>
                </ul>
            </li>
            <li><a href="${contactHref}">${t.navContact}</a></li>
            <li class="nav-dropdown nav-lang-dropdown" aria-label="${t.langSwitcherLabel}">
                <button type="button" class="nav-dropdown-toggle nav-lang-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="nav-lang-menu" title="${t.langMenuButton}">
                    <span class="nav-lang-code" aria-hidden="true">${vi ? t.langFlagVi : t.langFlagEn}</span>
                    <span class="nav-lang-label">${vi ? t.langVi : t.langEn}</span>
                    <span class="nav-caret" aria-hidden="true"></span>
                </button>
                <ul class="nav-dropdown-menu nav-lang-menu" id="nav-lang-menu" role="menu">
                    <li role="none">
                        <a href="${enHref}" role="menuitem" class="nav-lang-item${vi ? "" : " nav-current"}" ${vi ? "" : 'aria-current="true"'}>
                            <span class="nav-lang-code" aria-hidden="true">${t.langFlagEn}</span>
                            <span class="nav-lang-label">${t.langEn}</span>
                        </a>
                    </li>
                    <li role="none">
                        <a href="${viHref}" role="menuitem" class="nav-lang-item${vi ? " nav-current" : ""}" ${vi ? 'aria-current="true"' : ""}>
                            <span class="nav-lang-code" aria-hidden="true">${t.langFlagVi}</span>
                            <span class="nav-lang-label">${t.langVi}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    `;

        const footerHTML = `
    <div class="site-footer-wrap">
        <footer class="site-footer">
            <div class="site-footer-inner">
                <div class="site-footer-top">
                    <div class="site-footer-col site-footer-brand">
                        <h4>${t.footerAboutTitle}</h4>
                        <p>${t.footerAboutBody}</p>
                        <img src="${rootPath}images/common/uel_logo.png" alt="${t.logoImgAlt}">
                    </div>
                    <div class="site-footer-col">
                        <h4>${t.footerQuickTitle}</h4>
                        <ul class="site-footer-links">
                            <li><a href="${homeHref}">${t.navHome}</a></li>
                            <li><a href="${aboutHref}">${t.navAbout}</a></li>
                            <li><a href="${worksHref}">${t.navWorks}</a></li>
                            <li><a href="${contactHref}">${t.navContact}</a></li>
                        </ul>
                    </div>
                    <div class="site-footer-col site-footer-contact">
                        <h4>${t.footerContactTitle}</h4>
                        <p class="site-footer-title">${t.footerOrgTitle}</p>
                        <p>${t.footerAddress}</p>
                        <p><span class="site-footer-title">${t.footerEmailLabel}</span><br><a href="mailto:feminist.project@uel.edu.vn" class="site-footer-email">feminist.project@uel.edu.vn</a></p>
                    </div>
                </div>
                <div class="site-footer-bottom">
                    <div class="site-footer-bottom-grid">
                        <p>${t.footerCopyright}</p>
                        <p>${t.footerTagline}</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    `;

        if (!document.querySelector('link[rel="icon"]')) {
            const favicon = document.createElement("link");
            favicon.rel = "icon";
            favicon.type = "image/png";
            favicon.href = rootPath + "images/common/UEL_Logo final-09.png";
            document.head.appendChild(favicon);
        }

        const headerPlaceholder = document.getElementById("global-header");
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHTML;

            const langDropdown = headerPlaceholder.querySelector(".nav-lang-dropdown");
            const langToggle = headerPlaceholder.querySelector(".nav-lang-toggle");
            if (langDropdown && langToggle) {
                const setLangExpanded = (open) => {
                    langToggle.setAttribute("aria-expanded", open ? "true" : "false");
                };
                langDropdown.addEventListener("mouseenter", () => setLangExpanded(true));
                langDropdown.addEventListener("mouseleave", () => setLangExpanded(false));
                langDropdown.addEventListener("focusin", () => setLangExpanded(true));
                langDropdown.addEventListener("focusout", (e) => {
                    if (!langDropdown.contains(e.relatedTarget)) setLangExpanded(false);
                });
            }

            const navLinks = headerPlaceholder.querySelectorAll(".nav-links a");
            navLinks.forEach((link) => {
                const linkHref = link.getAttribute("href");
                if (!linkHref || linkHref === "#") return;
                if (link.closest(".nav-lang-dropdown")) return;

                const linkPath = normalizePath(new URL(linkHref, window.location.href).pathname);
                let linkRelativePath = toSiteRelative(linkPath).replace(/\/$/, "") || "";
                linkRelativePath = stripViPrefix(linkRelativePath);

                const isDropdownToggle = link.classList.contains("nav-dropdown-toggle");
                const isHome = linkRelativePath === "" || linkRelativePath === "index.html";
                const cur = pathForNav;
                const curNorm = cur === "" || cur === "index.html" ? "" : cur;

                const isCurrent =
                    (isHome && (curNorm === "" || curNorm === "index.html")) ||
                    (!isHome &&
                        curNorm === linkRelativePath &&
                        !isDropdownToggle) ||
                    (!isHome &&
                        !isDropdownToggle &&
                        linkRelativePath &&
                        curNorm.startsWith(linkRelativePath + "/")) ||
                    (isDropdownToggle && curNorm.startsWith("works/"));

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
})();
