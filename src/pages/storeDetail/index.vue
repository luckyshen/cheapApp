<template>
  <div>
    <div>
      <div>
        <div></div>
        <div>全场5</div>
      </div>
      <div>
        <i></i>
        <div>寿司</div>
        <i></i>
      </div>
    </div>
    <div>
      <div>
        <p>店铺地址</p>
        <p>温州</p>
        <i></i>
      </div>
      <div>
        <p>联系电话</p>
        <p>0577-18878787878</p>
        <i></i>
      </div>
      <div>
        <p>营业时间</p>
        <div>
          <p>上午 <span>11:00-14:00</span></p>
          <p>下午 <span>17:00-22:30</span></p>
        </div>
      </div>
      <ul>
        <li>
          <div>5元</div>
          <div>
            <div>消费满30元抵用</div>
            <div>2019-08-23至2019-09-23</div>
          </div>
          <div>
            <button>领取</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      title: '清空料理'
    };
  },

  created() {
  },
  mounted() {
    this.getTitle();
  },
  methods: {
    getTitle() {
      wx.setNavigationBarTitle({
        title: this.title
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>

