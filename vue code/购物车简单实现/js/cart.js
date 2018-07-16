new Vue({
    el:'#app',
    data:{
        shopListData:[],
        allPrice:0,
        isSelectedAll:false,
    },
    mounted(){
        //获取商品数据
        this.getShopData();
    },
    filters:{
        moneyFormat(money){
            return "¥" + money.toFixed(2);
        }
    },
    methods:{
        //请求商品数据
        getShopData(){
            this.$http.get('json/cart.json').then(response => {
                this.shopListData = response.body.allShops.listShop;
            }, response => {
            });
        },
        //全选
        selectedAll(flag){
            this.isSelectedAll = !flag;
            this.shopListData.forEach((value,idnex) => {
                if( typeof value.checked === 'undefined'){
                    this.$set(value,'checked',!flag)
                }else{
                    value.checked = !flag;
                }
            });
        },
        //选中单个商品
        singerShopSelected(shop){
            if( typeof shop.checked === 'undefined'){
                this.$set(shop,'checked',true);
            }else{
                shop.checked = !shop.checked;
            }

            //是否全选
            this.hasSelectedAll();
        },
        //判断是否全部选中
        hasSelectedAll(){
            let flag = true;
            this.shopListData.forEach((value,index) => {
                if(!value.checked){
                    flag = false;
                }
            })
            this.isSelectedAll = flag;
        }
    },
})