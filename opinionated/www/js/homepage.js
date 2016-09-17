var Discussion = {
  controller: function(ctrl, args){
    return {id: m.route.param("id")}
  },
  view: function(ctrl, args){
    return m('', {
      onclick: function(e){
        m.route("/discussion/" + args.discussion.serial_id)
      }}, m('div', {style: "border:1px solid grey; height:60px; font-size: 24px; padding-left: 6px; padding-top:18px; padding-right: 6px"}, [m('', {style: "position:absolute"}, args.discussion.name), m('', {style: "position:relative; width:100%;text-align: right"}, ">")]))
  }
}

var DiscussionList = {
  controller: function() {
    ctrl = this;
    ctrl.discussions = m.request({
        method: 'GET',
        url: API_URL + '/discussions'
    })
  },
  view: function(ctrl, args){
    var discussions = ctrl.discussions().map(function(discussion) {
      return m.component(Discussion, {serial_id: discussion.id, discussion: discussion})
    });
    return m('', discussions)
  }
}

var HomePage = {
  controller: function(){
    ctrl = this;
    ctrl.search = function() {
      m.request({
        method: 'POST',
        url: API_URL + '/users',
        data: { "search": ctrl.searchValue }
      })
      .then(function(res) {
        this.success = 'Success!'
        //m.route('/homepage');
      })
      .catch(function(err) {
        console.log(err);
        this.err = err;
      })
    }

    ctrl.searchValue = "";

    ctrl.discussion = {
      serial_id: "",
      name: ""
    }
  },
  view: function(){
    return m('div', {"style":"margin: 0;width:100%"},[
      m('.row', [
        m('.twelve.columns', [
          m('input.u-full-width', {"type":'search', "placeholder":'Search',
            value: ctrl.searchValue,
            onchange: function(e) {
              ctrl.searchValue = e.currentTarget.value;
              ctrl.search();
            },
            style: "height:60px",
          }
          )
          ])
      ]),
      m.component(DiscussionList)
    ])
  }
};
