'use strict';

import React from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

var CollectionView = React.createClass({
  groupItems: function (items, itemsPerRow) {
    var itemsGroups = [];
        var group = [];
        var flag=false;
        items.forEach(function(item) {
          if(flag)
          {
            if (group.length === itemsPerRow) {
              itemsGroups.push(group);
              group = [item];
            } else {
              group.push(item);
            }
          }
          else {
            flag=true;
          }
        });
        if (group.length > 0) {
          itemsGroups.push(group);
        }
        itemsGroups.unshift([items[0]]);
        return itemsGroups;
  },
  renderGroup: function ({ item }) {
    var that = this;
    if(item.length==1&&this.state.flag)
    {
      this.state.flag=false;
      var items = item.map(function (obj, index) {
        return that.props.renderHeader(obj, that.props.openModal, that.props.mCon);
      });
      return (
        <View>
          {
            items
          }
          {this.getBlankCell(item.length, this.props.itemsPerRow)
          }

        </View>
      );
    }
    else {
      var items = item.map(function (obj, index) {
        return that.props.renderItem(obj, that.props.openModal, index, that.props.mCon);
      });
      items = items.map((obj, i) => {
        return (
          <View style={{ flex: 1 }}>
            {obj}
          </View>)

      })
      return (
        <View style={styles.group}>
          {
            items
          }
          {this.getBlankCell(item.length, this.props.itemsPerRow)
          }

        </View>
      );
    }
  },

  getBlankCell(currentItems, itemsPerRow) {

    if (currentItems < itemsPerRow) {
      var arr = []
      for (var i = 0; i < itemsPerRow - currentItems; i++) {
        arr.push(
          <View style={{ flex: 1 }}>
          </View>
        )
      }
      return arr
    }

  },
  render: function () {
    this.state={flag: true};
    var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    return (<FlatList
      data={groups}
      {...this.props}
      renderItem={this.renderGroup}
    />);
  },
});


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 25,
    paddingBottom: 8
  }
});

module.exports = CollectionView;
