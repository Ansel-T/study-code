new Vue({
    el:'#app',
    data:{
        shopListData:[],
        allPrice:0,
        isSelectedAll:false,
        isDiscounts:false
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
            //计算总价
            this.getAllShopPrice();
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
            //计算总价
            this.getAllShopPrice();
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
        },
        //单个商品加减
        singerShopPrice(shop,flag){
            if(flag){
                shop.shopNum += 1;
            }else{
                if(shop.shopNum <= 1){
                    shop.shopNum = 1;
                    return ;
                }
                shop.shopNum -= 1;
            }
            shop.checked = true;
            //是否全选
            this.hasSelectedAll();
            //计算总价
            this.getAllShopPrice();
        },
        //计算价格
        getAllShopPrice(){
            let allPrice = 0;
            this.shopListData.forEach((value,index) => {
                if(value.checked){
                    allPrice += value.price * value.shopNum;
                }
            })
            this.allPrice = allPrice;
        }
    },
})