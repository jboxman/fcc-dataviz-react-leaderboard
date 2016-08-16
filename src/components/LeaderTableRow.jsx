import React, {PropTypes} from 'react';

const LeaderTableRow = (props) => {

  const { index, username, img, recent, alltime } = props;

  // http://stackoverflow.com/a/20061758
  function insertCommas(i, str = String(i)) {
    const arr = [];
    const a = str.split("");

    let x = 0;
    let t;

    a.reverse();

    while (t = a.shift()) {
     if (((x++ % 3) == 0) && arr.length > 0)
         arr.unshift(",");
     arr.unshift(t);
    }

    return arr.join("");
  }

  return (
    // Add commas
    <tr>
      <td>
        { index }
      </td>
      <td>
        <h4 className="ui image header">
          <img src={ img } className="ui mini rounded image" />
          <div className="content">
            { username }
        </div>
      </h4>
      </td>
      <td>
        { insertCommas(recent) }
      </td>
      <td>
        { insertCommas(alltime) }
      </td>
    </tr>
  )
};

/*
LeaderTableRow.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};
*/

export default LeaderTableRow;
