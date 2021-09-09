export default {
    methods: {
        translateToTurkishBreadcrumbText(text) {
            switch (text) {
                case "Admin":
                    return "Yönetici Paneli";
                case "Panel":
                    return "Panel"
                case "Orders":
                    return "Siparişler";
                case "Order":
                    return "Sipariş";
                case "Products":
                    return "Ürünler";
                case "Settings":
                    return "Ayarlar";
                case "Users":
                    return "Kullanıcılar";

                default:
                    return text;
            }
        },
    },

    computed: {
        breadcrumbs() {
            let breadcrumbs = [];
            let path = this.$route.fullPath.split("/");
            for (let i = 1; i < path.length; i++) {
                let text = path[i].charAt(0).toUpperCase() + path[i].slice(1);
                text = this.translateToTurkishBreadcrumbText(text);
                breadcrumbs.push({
                    text: text,
                    disabled: false,
                    href: path.slice(0, i + 1).join("/"),
                });
            }
            return breadcrumbs;
        },

    },
}