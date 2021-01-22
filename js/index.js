new Vue({
  el: '#app',
  data: function () {
    return {
      treeData: [],
      articles: [],
      allArticles: [],
      searchParam: ''
    }
  },
  mounted() {
    // 加载文章分类树
    this.loadClassifies()
  },
  methods: {
    /**
     * 加载文章分类树
     */
    loadClassifies() {
      var self = this;
      $.getJSON('./config.json', function (data) {
        self.treeData = data;
        var allArticles = [];
        self.parseClassifyArticles(data, allArticles);
        self.articles = allArticles;
        self.allArticles = allArticles;
      })
    },
    /**
     * 解析分类下文章列表
     * @param data
     */
    parseClassifyArticles(data, allArticles) {
      for(var i in data) {
        var item = data[i];
        if (item.children) {
          this.parseClassifyArticles(item.children, allArticles)
        } else {
          var articles = item.articles;
          if (articles) {
            for(var j in articles) {
              allArticles.push(articles[j])
            }
          }
        }
      }
    },
    /**
     * 树节点点击回调
     * @param data
     * @param node
     */
    handleNodeClick(data, node) {
      if (node.isLeaf) {
        this.articles = data.articles
      }
    },
    /**
     * 搜索按钮点击回调
     */
    handleSearch() {
      var param = this.searchParam;
      if (param && param.trim() != '') {
        var res = [];
        var source = this.articles;
        for(var i in source){
          var item = source[i];
          if (item.name.indexOf(param) > 0) {
            res.push(item)
          }
        }
        this.articles = res;
      }
    }
  }
});
