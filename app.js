var React = require('react')

var WebtorrentApp = React.createClass({
  render: function() {
    return (
      <div className="WebtorrentApp">Hello Torrent</div>
    );
  }
});

React.render(<WebtorrentApp/>, document.getElementById('app'))