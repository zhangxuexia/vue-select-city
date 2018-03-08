const apiMethods = {
  data(){
    return {
      mock:true
    }
  },
  methods: {
    geturl(url) {
      let mock =this.mock;
      let getUrl = !mock ? '' + url + '.shtml' : '/src/mock' + url + '.json';
      return getUrl;
    },
    apiGet(url, data) {
      return new Promise((resolve, reject) => {
        this.$http.get(this.geturl(url), data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
          bus.$message({
            message: '请求超时，请检查网络',
            type: 'warning'
          })
        })
      })
    },
    apiPost(url, data) {
      if(!this.mock) {
        return new Promise((resolve, reject) => {
          this.$http.post(url, data).then((response) => {
            resolve(response.data)
          }).catch((response) => {
            console.log('f', response)
            resolve(response)
            bus.$message({
              message: '请求超时，请检查网络',
              type: 'warning'
            })
          })
        })
      }
      else{
        this.apiGet(url,data);
      }
    },
    apiDelete(url, id) {
      return new Promise((resolve, reject) => {
        this.$http.delete(url + id).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
          _g.closeGlobalLoading()
          bus.$message({
            message: '请求超时，请检查网络',
            type: 'warning'
          })
        })
      })
    },
    apiPut(url, id, obj) {
      return new Promise((resolve, reject) => {
        this.$http.put(url + id, obj).then((response) => {
          resolve(response.data)
        }, (response) => {
          _g.closeGlobalLoading()
          bus.$message({
            message: '请求超时，请检查网络',
            type: 'warning'
          })
          reject(response)
        })
      })
    },
    handelResponse(res, cb, errCb) {
      if (res.status == 0) {
        cb(res.data)
      } else {
        if (typeof errCb == 'function') {
          errCb()
        }
        this.handleError(res)
      }
    },
    handleError(res) {
      console.log('default error')
    },
    resetCommonData(data) {

    },
    reAjax(url, data) {
      return new Promise((resolve, reject) => {
        this.$http.post(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
          bus.$message({
            message: '请求超时，请检查网络',
            type: 'warning'
          })
        })
      })
    }
  }
}


export default apiMethods
