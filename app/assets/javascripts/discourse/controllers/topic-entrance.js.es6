function entranceDate(bumpedAt, showTime) {
  var today = new Date();

  if (bumpedAt.getDate() === today.getDate()) {
    return moment(bumpedAt).format(I18n.t("dates.time"));
  }

  if (bumpedAt.getYear() === today.getYear()) {
    // No year
    return moment(bumpedAt).format(
      showTime ? I18n.t("dates.long_no_year") : I18n.t("dates.long_no_year_no_time")
    );
  }

  return moment(bumpedAt).format(
    showTime ? I18n.t('dates.long_with_year') : I18n.t('dates.long_with_year_no_time')
  );
}

export default Ember.ObjectController.extend({
  position: null,

  createdDate: function() {
    return new Date(this.get('model.created_at'));
  }.property('model.created_at'),

  bumpedDate: function() {
    return new Date(this.get('model.bumped_at'));
  }.property('model.bumped_at'),

  showTime: function() {
    var diffMs = this.get('bumpedDate').getTime() - this.get('createdDate').getTime();
    return diffMs < (1000 * 60 * 60 * 24 * 2);
  }.property('createdDate', 'bumpedDate'),

  topDate: function() {
    return entranceDate(this.get('createdDate'), this.get('showTime'));
  }.property('createdDate'),

  bottomDate: function() {
    return entranceDate(this.get('bumpedDate'), this.get('showTime'));
  }.property('bumpedDate'),

  actions: {
    show: function(data) {
      // Show the chooser but only if the model changes
      if (this.get('model') !== data.topic) {
        this.set('model', data.topic);
        this.set('position', data.position);
      }
    },

    enterTop: function() {
      Discourse.URL.routeTo(this.get('url'));
    },

    enterBottom: function() {
      Discourse.URL.routeTo(this.get('lastPostUrl'));
    }
  }
});
