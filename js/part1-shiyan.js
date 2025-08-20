// 监听滚动事件，控制元素显示与隐藏
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    const dawnOperation = document.getElementById('dawn-operation');
    const quote = document.getElementById('quote');
    const imageSection = document.getElementById('image-section');

    // 计算滚动百分比（0到100）
    const scrollPercent = (scrollPosition / (document.body.scrollHeight - windowHeight)) * 100;

    // 曙光行动面板：当滚动到10%时显示，滚动到40%时隐藏
    if (scrollPercent >= 3 && scrollPercent < 40) {
        dawnOperation.style.opacity = '1';
    } else {
        dawnOperation.style.opacity = '0';
    }

    // 引言文本：当滚动到40%时显示，滚动到70%时隐藏
    if (scrollPercent >= 40 && scrollPercent < 70) {
        quote.style.opacity = '1';
    } else {
        quote.style.opacity = '0';
    }

    // 图片区域：当滚动到70%时显示
    if (scrollPercent >= 70) {
        imageSection.style.opacity = '1';
    } else {
        imageSection.style.opacity = '0';
    }
});

// 初始触发一次滚动事件，确保正确的初始状态
window.dispatchEvent(new Event('scroll'));