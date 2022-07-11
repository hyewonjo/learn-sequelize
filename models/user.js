const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20), // varchar
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED, // int
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN, // tinyint
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE, // datetime
                allowNull: false,
                defaultValue: Sequelize.NOW, // now()
            },
        }, {
            sequelize,
            timestamps: false, // true 이면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가한다.
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false, // true 이면 deletedAt이라는 컬럼이 생긴다. 로우를 삭제할 때 완전히 지워지지않고 deletedAt에 지운 시각이 기록된다. 로우를 조회하는 명령을 내렸을 때는 deletedAt의 값이 null인 로우를 조회한다.
            charset: 'utf8',
            collate: 'utf8_general_ci',
            });
    }
    static associate(db) {
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
};