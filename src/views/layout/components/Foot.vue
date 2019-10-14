<template>
    <footer class="ny-footer">
        <div class="inner-wrap clearfix">
            <div class="left">
                <div class="fnav pc-block">
                    <a href="http://www.dowsure.com/list-64-1.html">资质信息</a>
                    <a href="http://www.dowsure.com/list-8-1.html">关于我们</a>
                    <a href="http://www.dowsure.com/list-6-1.html">商户故事</a>
                    <a href="http://www.dowsure.com/list-7-1.html">常见问题</a>
                    <a href="http://www.dowsure.com/list-21-1.html">新闻中心</a>
                </div>
                <div class="copyright">
                    版权所有©  2018 豆沙包科技有限公司 沪ICP备15015443号-1			</div>
            </div>
            <div class="link pc-block">
                <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=2962353314&amp;site=qq&amp;menu=yes" target="_blank"><img src="http://www.dowsure.com/res/lx/images/ico_qq.png"></a>
                <a href="javascript:void(0)" class="weixin">
                    <img src="http://www.dowsure.com/res/lx/images/ico_wx.png">
                    <div>
                        <img src="http://www.dowsure.com/res/lx/images/weixin.jpg">
                    </div>
                </a>
                <a href="https://weibo.com/u/5892923185?refer_flag=1001030108_" target="_blank"><img src="http://www.dowsure.com/res/lx/images/ico_wb.png"></a>
            </div>
            <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>	
    </footer>
</template>

<script>
  
export default {
  data() {
    return {
        show:false
    }  
  },
  
  methods: {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    img {
        display: block;
        max-width: 100%;
        border: 0;
        margin: 0 auto;
    }
    .inner-wrap {
        width: 100%;
        max-width: 1200px;
        min-width: 320px;
        margin: 0 auto;
    }
    .ny-footer{ background: #202a3b; color: #FFFFFF; width: 100%;height: 120px; position: fixed;bottom: 0; z-index: 3;}
    .ny-footer .left{ float: left;margin-top:35px;}
    .ny-footer .left .fnav a{ display: inline-block; padding: 0 20px; color: #FFFFFF; position: relative;}
    .ny-footer .left .fnav a:before{ content: ""; position: absolute; top:50%; margin-top: -8px; left:0; width: 1px; height: 16px; background: #FFFFFF;}
    .ny-footer .left .fnav a:first-child{ padding-left: 0;}
    .ny-footer .left .fnav a:first-child:before{ display: none;}
    .ny-footer .left .copyright{ margin-top: 12px; font-size: 12px; padding: 0.4rem 0rem; text-align: left;}
    .ny-footer .left .copyright span{margin-left: 10px; }
    .ny-footer .left .copyright a{  color: #fff; }
    .ny-footer .link{ float:right;margin-top:35px;}
    .ny-footer .link a{ margin-left: 20px; display: inline-block; position: relative;}
    .ny-footer .link .weixin{ position: relative;}
    .ny-footer .link .weixin:hover div{ display: block;}
    .ny-footer .link .weixin div{ display: none; position: absolute; bottom: 50px; left:50%; margin-left: -60px; width: 120px;}
    @media (max-width:780px){
        .ny-footer {
            display: none
        }
    }
</style>
