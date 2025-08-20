// 滚动动画控制
function setupScrollAnimation() {
    const text1 = document.getElementById('part2-text1');
    const text2 = document.getElementById('part2-text2');
    const hud = document.getElementById('hud');

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function () {
        lastScroll = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateScrollPosition(lastScroll);
                ticking = false;
            });

            ticking = true;
        }
    });

    function updateScrollPosition(scrollY) {
        const windowHeight = window.innerHeight;
        const scrollPercent = scrollY / windowHeight;

        // 更新HUD显示
        hud.textContent = `${Math.round(scrollPercent * 100)}%`;

        // 文本切换逻辑
        if (scrollPercent < 0.4) {
            // 显示第一段文字
            text1.style.opacity = 1;
            text1.style.transform = 'translateY(0)';
            text2.style.opacity = 0;
            text2.style.transform = 'translateY(50px)';
        } else if (scrollPercent > 0.6) {
            // 显示第二段文字
            text1.style.opacity = 0;
            text1.style.transform = 'translateY(-50px)';
            text2.style.opacity = 1;
            text2.style.transform = 'translateY(0)';
        } else {
            // 过渡区域
            const transitionPercent = (scrollPercent - 0.4) / 0.2;
            if (transitionPercent < 0.5) {
                // 第一段文字淡出
                text1.style.opacity = 1 - transitionPercent * 2;
                text1.style.transform = `translateY(${-transitionPercent * 50}px)`;
                text2.style.opacity = 0;
            } else {
                // 第二段文字淡入
                text1.style.opacity = 0;
                text2.style.opacity = (transitionPercent - 0.5) * 2;
                text2.style.transform = `translateY(${(1 - (transitionPercent - 0.5) * 2) * 50}px)`;
            }
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
    setupScrollAnimation();

    // 初始显示第一段文本
    document.getElementById('text1').style.opacity = 1;
    document.getElementById('text1').style.transform = 'translateY(0)';

    // 添加键盘控制
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
            window.scrollBy(0, window.innerHeight / 2);
        } else if (e.key === 'ArrowUp') {
            window.scrollBy(0, -window.innerHeight / 2);
        }
    });
});