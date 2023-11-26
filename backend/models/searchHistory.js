module.exports = (sequelize, DataTypes) => {
    const SearchHistory = sequelize.define('SearchHistory', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userQuery: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      resultName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      resultURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      resultPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return SearchHistory;
  };