const baseUrl = '/api/notes'

new Vue({
  el: '.js-instance',
  name: 'vue-instance',

  data() {
    return {
      id: null,
      itemName: null,
      itemNotes: null,
      warning: '',
      items: [],
    };
  },


  mounted() {
    if (localStorage.getItem('items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('items'));
      } catch(e) {
        localStorage.removeItem('items');
      }
    }

    axios.get(baseUrl)
       .then(res => {
         this.items = res.data;
       })
       .catch(function (error) {
         console.log(error)
       })
  },

  methods: {
    removeItem(index) {
      var id = this.items[index];
      if (id) {
        id = this.items[index]['id']
        axios.delete(`${baseUrl}/${id}`)
      } else {
        console.log("can't delete yet")
        return;
      }
      this.items.splice(index, 1);
      this.saveItems();
    },


    add() {
      if (!this.itemName) {
        this.warning = 'No empty product names allowed.';
        return;
      }

        const noteObject = {
          item: this.itemName,
          additionalNotes: this.itemNotes
        }

        axios({
          method: "post",
          url: baseUrl,
          data: noteObject
        }).then(response =>{
          this.id = response.data.id
            this.items.push(
              {id: this.id, item: this.itemName, additionalNotes: this.itemNotes}
            )
          this.itemName = '';
          this.itemNotes = '';
          this.id = '';
          this.warning = '';
        });
    },

    saveItems() {
      const parsed = JSON.stringify(this.items);
      localStorage.setItem('items', parsed)
    }
  },

});
