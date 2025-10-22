/*
 Navicat Premium Data Transfer

 Source Server         : hello
 Source Server Type    : MySQL
 Source Server Version : 32336
 Source Host           : 192.168.171.128:3306
 Source Schema         : hlyx

 Target Server Type    : MySQL
 Target Server Version : 32336
 File Encoding         : 65001

 Date: 21/10/2025 18:59:06
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_subgroup
-- ----------------------------
DROP TABLE IF EXISTS `yx_subgroup`;
CREATE TABLE `yx_subgroup`  (
  `id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `title` char(127) NULL DEFAULT '',
  `tenet` char(127) NULL DEFAULT '',
  `name` char(15) NOT NULL DEFAULT '',
  `del_flag` int(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
