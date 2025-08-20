// 横向滑动
const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
});
const scrollbox = {
    wapper: document.querySelector(".cardsbox_card_wapper"),
    cardsbox: document.querySelector(".cardsbox"),
    distance: 0,
    if_leave: false,
    init() {
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
        this.create_scrolltrigger();
    },
    create_scrolltrigger() {
        ScrollTrigger.create({
            trigger: this.wapper,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                this.cardsbox.style.transform = `translateX(-${self.progress * this.distance}px)`;
            },
            onLeave: () => {
                this.if_leave = true;
            },
            onEnterBack: () => {
                this.if_leave = false;
            }
        });
    },
    resize() {
        this.distance = this.cardsbox.offsetWidth - innerWidth;
        this.wapper.style.height = `${this.distance}px`;
        if (this.if_leave) this.cardsbox.style.transform = `translateX(-${this.distance}px)`;
    }
};
scrollbox.init();