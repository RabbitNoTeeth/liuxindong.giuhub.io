new Vue({
  el: '#app',
  data: function () {
    return {
      treeData: [],
      allArticles: [],
      searchParam: '',
      currentClassify: null
    }
  },
  computed: {
    articles: function () {
      var allArticles = this.allArticles;
      var searchParam = (this.searchParam && this.searchParam.toString().trim() != '') ? this.searchParam.toString().toLowerCase() : null;
      var classify = this.currentClassify != null ? this.currentClassify.id : null;
      var res = [];
      for (var i in allArticles) {
        var article = allArticles[i];
        if (searchParam && classify) {
          if ((article.name.toLowerCase().indexOf(searchParam) > -1 || article.classifyName.toLowerCase().indexOf(searchParam) > -1) && article.classifies.indexOf(classify) > -1) {
            res.push(article)
          }
        } else if (searchParam && !classify) {
          if (article.name.toLowerCase().indexOf(searchParam) > -1 || article.classifyName.toLowerCase().indexOf(searchParam) > -1) {
            res.push(article)
          }
        } else if (!searchParam && classify) {
          if (article.classifies.indexOf(classify) > -1) {
            res.push(article)
          }
        } else {
          res.push(article)
        }
      }
      return res;
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
        self.parseClassifyArticles(data, allArticles, []);
        self.allArticles = allArticles;
      })
    },
    /**
     * 解析分类下文章列表
     * @param data
     * @param allArticles
     * @param parentClassifies
     */
    parseClassifyArticles(data, allArticles, parentClassifies) {
      for(var i in data) {
        var item = data[i];
        item.classifies = [ ...parentClassifies, item ];
        if (item.children) {
          this.parseClassifyArticles(item.children, allArticles, item.classifies)
        } else {
          var articles = item.articles;
          if (articles) {
            for(var j in articles) {
              var article = articles[j];
              article.classifyName = item.classifies.map(i => i.label).join(' - ');
              var articleClassifies = [];
              for(var x in item.classifies){
                articleClassifies.push(item.classifies[x].id)
              }
              article.classifies = articleClassifies;
              allArticles.push(article)
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
      this.currentClassify = data
    }
  }
});
