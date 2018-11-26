new Vue({
  el: '.js-instance',
  name: 'vue-instance',

  data() {
    return {
      itemName: null,
      itemNotes: null,
      warning: '',
      items: [
        {name:'puuhöylä', notes:'ei ollu puuhöylä'}
      ],
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
  },

  methods: {
    removeItem(index) {
      this.items.splice(index, 1);
      this.saveItems();
    },

    add() {
      if (this.itemName === '') {
        this.warning = 'Only strings containing 1-30 alphanumerical characters or dots or commas allowed';
        return;
      }

      if (this.itemName.match(/^[a-z0-9,.]{1,30}$/i)) {
        console.log(this.items);
        this.items.push(
          {name: this.itemName, notes: this.itemNotes}
        );
        this.itemName = '';
        this.itemNotes = '';
        this.warning = '';
        this.saveItems();
      } else {
        this.warning = 'Only strings containing 1-30 alphanumerical characters or dots or commas allowed';
      }

      const noteObject = {
        item: this.itemName,
        additionalNotes: this.itemNotes,
        show: true
      }

    //  noteService
      //  .create(noteObject)
        //.then(newNote => {
        //  console.log('here')
        //  this.setState({
        //    items: this.items.concat(newNote),
        //    itemName: '',
        //    itemNotes: '',
        //  })
    // })



    },

    saveItems() {
      const parsed = JSON.stringify(this.items);
      localStorage.setItem('items', parsed)
    }
  },

});
