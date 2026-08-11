# Script to apply all fixes to icfgl-2026.html (Vietnamese version)
$filePath = "vi\works\icfgl\icfgl-2026\icfgl-2026.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Fix "Featured Diễn giả chính" → "Diễn giả chính"
$content = $content -replace '<h2>Featured Di[eê]n gi[aả] ch[ií]nh</h2>', '<h2>Diễn giả chính</h2>'

# 2. Fix PRESENTATION labels → THUYẾT TRÌNH
$content = $content -replace 'class="presentation-label">PRESENTATION<', 'class="presentation-label">THUYẾT TRÌNH<'

# 3. Fix fa-regular fa-calendar-plus → fa-solid fa-calendar-plus (Pro-only in regular)
$content = $content -replace 'class="fa-regular fa-calendar-plus"', 'class="fa-solid fa-calendar-plus"'

# 4. Fix English text in Venue/Transportation sections
# 4a. Ho Chi Minh City description
$content = $content -replace 'Welcome to <strong>Ho Chi Minh City</strong>, the vibrant economic and cultural hub of Vietnam\. Known for its dynamic energy, rich history, and world-renowned culinary scene, the city provides an inspiring backdrop for our international gathering at <strong style="color: #144e8c;">ICFGL 2026</strong>\.', 'Chào mừng đến với <strong>Thành phố Hồ Chí Minh</strong>, trung tâm kinh tế và văn hóa sôi động của Việt Nam. Nổi tiếng với năng lượng năng động, lịch sử phong phú và ẩm thực nổi tiếng thế giới, thành phố là bối cảnh truyền cảm hứng cho sự kiện quốc tế <strong style="color: #144e8c;">ICFGL 2026</strong>.'

# 4b. Transport intro paragraph
$content = $content -replace 'To ensure a seamless and stress-free experience for all our international and domestic guests, navigating Ho Chi Minh City is easier than ever with the following&nbsp;options:', 'Để đảm bảo trải nghiệm thuận tiện, không căng thẳng cho tất cả đại biểu trong và ngoài nước, việc di chuyển tại Thành phố Hồ Chí Minh ngày càng dễ dàng hơn với các&nbsp;lựa chọn sau:'

# 4c. Metro note
$content = $content -replace 'Disembark at <strong>Ga ĐHQG-HCM</strong> \(Ga Đại học Quốc gia\) or <strong>Ga Khu Công nghệ cao</strong>\. A short taxi or Bus 170 ride connects directly to UEL campus\.', 'Xuống tại ga <strong>ĐHQG-HCM</strong> (Ga Đại học Quốc gia) hoặc <strong>Ga Khu Công nghệ cao</strong>. Đi taxi hoặc Xe buýt 170 một đoạn ngắn là đến thẳng khuôn viên UEL.'

# 4d. Airport description
$content = $content -replace 'Participants traveling by air will arrive at <strong>Tan Son Nhat International Airport \(SGN\)</strong>\. The airport is well-connected to the city center via taxis, ride-hailing services, and airport buses\.', 'Đại biểu di chuyển bằng đường hàng không sẽ đến <strong>Sân bay Quốc tế Tân Sơn Nhất (SGN)</strong>. Sân bay được kết nối tốt với trung tâm thành phố qua taxi, ứng dụng đặt xe và xe buýt sân bay.'

# 4e. Bus routes note
$content = $content -replace 'Xe buýt nhanh trực tiếp từ sân bay: <strong>Tuyến 109</strong> or <strong>Tuyến 152</strong> to Downtown\.', 'Xe buýt nhanh trực tiếp từ sân bay: <strong>Tuyến 109</strong> hoặc <strong>Tuyến 152</strong> về Trung tâm thành phố.'

# 4f. Apps section intro
$content = $content -replace 'To navigate HCMC like a local, we highly recommend downloading these applications prior to your arrival\. Ride-hailing offers transparent pricing and convenient&nbsp;booking\.', 'Để di chuyển tại TP.HCM như người bản địa, chúng tôi khuyến nghị tải các ứng dụng này trước khi đến. Đặt xe công nghệ giúp bạn biết giá cước trước và đặt chỗ tiện&nbsp;lợi.'

# 4g. Traditional taxi
$content = $content -replace 'If you prefer not to use apps, reliable metered taxi brands like <span>Vinasun</span> \(white cars with green/red stripe\) and <span>Mai Linh</span> \(green cars\) are abundant throughout the city and can be easily hailed from hotels or the airport terminal exits\.', 'Nếu không muốn dùng ứng dụng, các hãng taxi có đồng hồ tính tiền đáng tin cậy như <span>Vinasun</span> (xe trắng có sọc xanh/đỏ) và <span>Mai Linh</span> (xe xanh) có mặt khắp thành phố, có thể vẫy dễ dàng từ khách sạn hoặc lối ra sân bay.'

# 5. Fix Speaker Modal labels
$content = $content -replace '<div class="sp-session-label">Date</div>', '<div class="sp-session-label">Ngày</div>'
$content = $content -replace '<div class="sp-session-label">Time</div>', '<div class="sp-session-label">Giờ</div>'
$content = $content -replace '<div class="sp-session-label">Nation</div>', '<div class="sp-session-label">Quốc gia</div>'
$content = $content -replace '<div class="sp-section-label">KEYNOTE TITLE</div>', '<div class="sp-section-label">TIÊU ĐỀ BÀI PHÁT BIỂU CHÍNH</div>'
$content = $content -replace '<div class="sp-section-label">ABSTRACT OVERVIEW</div>', '<div class="sp-section-label">TÓM TẮT NỘI DUNG</div>'
$content = $content -replace '<div class="sp-section-label">KEY THEMES &amp; CONCEPTS</div>', '<div class="sp-section-label">CHỦ ĐỀ &amp; KHÁI NIỆM TRỌNG TÂM</div>'

# 6. Fix Speaker image path with spaces (URL encode)
$content = $content -replace 'icfgl2026/Prof Aoife O', 'icfgl2026/Prof%20Aoife%20O'

# Write back with UTF-8 encoding (no BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)

Write-Host "All fixes applied successfully!"
Write-Host "File size: $((Get-Item $filePath).Length) bytes"
