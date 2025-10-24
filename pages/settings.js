const { Setting } = require('../models');

// Custom Settings Page Handler
const settingsHandler = async (request, response, context) => {
  try {
    if (request.method === 'GET') {
      // Get all settings
      const settings = await Setting.findAll({
        order: [['key', 'ASC']]
      });
      
      return {
        settings: settings.map(setting => ({
          id: setting.id,
          key: setting.key,
          value: setting.value,
          description: setting.description,
          updatedAt: setting.updatedAt
        })),
        currentUser: context.currentAdmin
      };
    } else if (request.method === 'POST') {
      // Update settings
      const { settings } = request.body;
      
      if (!Array.isArray(settings)) {
        return { error: 'Settings must be an array' };
      }
      
      const results = [];
      
      for (const setting of settings) {
        if (setting.id) {
          // Update existing setting
          const [updatedRows] = await Setting.update(
            { value: setting.value, description: setting.description },
            { where: { id: setting.id } }
          );
          results.push({ id: setting.id, updated: updatedRows > 0 });
        } else if (setting.key) {
          // Create new setting
          const newSetting = await Setting.create({
            key: setting.key,
            value: setting.value,
            description: setting.description
          });
          results.push({ id: newSetting.id, created: true });
        }
      }
      
      return {
        success: true,
        results,
        currentUser: context.currentAdmin
      };
    }
  } catch (error) {
    console.error('Settings error:', error);
    return {
      error: error.message,
      currentUser: context.currentAdmin
    };
  }
};

module.exports = {
  settingsHandler
};
