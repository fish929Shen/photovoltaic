document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo');
    const menu = document.querySelector('.logo-menu');
    const menuItems = document.querySelectorAll('.menu-item');

    // 初始化菜单动画
    gsap.set(menuItems, {
        y: -10,
        opacity: 0
    });

    // 鼠标移入Logo
    logo.addEventListener('mouseenter', function () {
        // 显示菜单
        menu.style.display = 'flex';

        // 菜单项动画
        gsap.to(menuItems, {
            y: 0,
            opacity: 0.7,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out'
        });
    });

    // 鼠标移出Logo
    logo.addEventListener('mouseleave', function () {
        // 隐藏菜单动画
        gsap.to(menuItems, {
            y: -10,
            opacity: 0,
            duration: 0.2,
            stagger: 0.05,
            ease: 'power2.in',
            onComplete: function () {
                menu.style.display = 'none';
            }
        });
    });

    // 菜单项交互
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            gsap.to(this, {
                color: 'white',
                opacity: 1,
                duration: 0.2,
                textShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
            });
        });

        item.addEventListener('mouseleave', function () {
            gsap.to(this, {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 0.7,
                duration: 0.2,
                textShadow: 'none'
            });
        });
    });

    // 窗口大小改变时重新定位
    window.addEventListener('resize', function () {
        gsap.set(menuItems, { y: -10, opacity: 0 });
    });
});