Ext.define('KitchenSink.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    _hasTreeNav: true,

    applyState: function(state) {
        var refs = this.getReferences();

        if (state.hasTreeNav) {
            refs.tree.show();
            refs['navigation-toolbar'].hide();
            refs.contentPanel.header.hidden = false;
            this._hasTreeNav = true;
        }
        else {
            refs.tree.hide();
            refs['navigation-toolbar'].show();
            refs.contentPanel.header.hidden = true;
            this._hasTreeNav = false;
        }
    },

    getState: function() {
        return {
            hasTreeNav: this._hasTreeNav
        };
    },

    showBreadcrumbNav: function() {
        var me = this,
            refs = me.getReferences(),
            navToolbar = refs['navigation-toolbar'],
            treeNav = refs.tree,
            viewModel = me.getViewModel(),
            selectedView = viewModel.get('selectedView'),
            selection = me.preFilterSelection;

        Ext.suspendLayouts();

        if (navToolbar) {
            navToolbar.show();
        }
        else {
            refs.contentPanel.addDocked({
                xtype: 'navigation-toolbar'
            });
        }

        if (!selectedView && selection) {
            viewModel.set('selectedView', selection);
        }

        treeNav.hide();
        refs.contentPanel.getHeader().hide();

        me._hasTreeNav = false;
        me.getView().saveState();
        Ext.resumeLayouts(true);

        // Ensure focus is not lost when treeNav panel is hidden
        navToolbar.child(':last').focus();
    },

    showTreeNav: function() {
        var refs = this.getReferences(),
            treeNav = refs.tree,
            navToolbar = refs['navigation-toolbar'],
            selection = navToolbar.getSelection();

        Ext.suspendLayouts();

        if (treeNav) {
            treeNav.show();
        }
        else {
            treeNav = this.getView().moveBefore({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            }, refs.contentPanel);
        }

        navToolbar.hide();
        refs.contentPanel.getHeader().show();

        this._hasTreeNav = true;
        this.getView().saveState();
        Ext.resumeLayouts(true);

        // Ensure NavTree scrolls to show the selection and that focus is not lost.
        // Unless the selection is currently filtered out
        if (selection && treeNav.store.contains(selection)) {
            treeNav.ensureVisible(selection.isRoot() ? treeNav.store.getAt(0) : selection, {
                focus: true
            });
        }
    },

    treeNavNodeRenderer: function(value) {
        return this.rendererRegExp ? value.replace(this.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
    },

    onNavFilterFieldChange: function(field, value) {
        var me = this,
            tree = me.getReferences().tree,
            store = tree.getStore(),
            selection = me.preFilterSelection;

        if (value) {
            me.preFilterSelection = me.getViewModel().get('selectedView');
            me.rendererRegExp = new RegExp('(' + value + ')', "gi");
            field.getTrigger('clear').show();
            me.filterStore(value);
        }
        else {
            me.rendererRegExp = null;
            store.clearFilter();
            field.getTrigger('clear').hide();

            // Ensure selection is still selected.
            // It may have been evicted by the filter
            if (selection && selection !== store.getRoot() && store.contains(selection)) {
                tree.ensureVisible(selection, {
                    select: true
                });
            }
        }
    },

    onNavFilterClearTriggerClick: function() {
        this.getReferences().navtreeFilter.setValue();
    },

    onNavFilterSearchTriggerClick: function() {
        var field = this.getReferences().navtreeFilter;

        this.onNavFilterFieldChange(field, field.getValue());
    },

    filterStore: function(value) {
        var me = this,
            tree = me.lookup('tree'),
            store = tree.getStore();

        if (value.length < 1) {
            store.clearFilter();
        }
        else {
            store.getFilters().replaceAll({
                property: 'text',
                value: new RegExp(Ext.String.escapeRegex(value), 'i')
            });
        }
    },

    colorchange: function(menu, item) {
        var darkMode = this.lookup('darkMode').getValue();

        if (item && item.xtype === 'menuitem') {
            this.updateMaterialTheme(darkMode, item.baseColor, item.accentColor);
        }
    },

    changeDarkMode: function(checkbox, newValue, oldValue, eOpts) {
        this.updateMaterialTheme(newValue);
        Ext.getBody().toggleCls('dark-mode', newValue);
        checkbox.ownerCt.hide();
    },

    updateMaterialTheme: function(darkMode, base, accent) {
        var me = this;

        if (Ext.theme.Material) {
            Ext.theme.Material.setColors({
                'darkMode': darkMode,
                'base': base || me._materialBaseColor,
                'accent': accent || me._materialAccentColor
            });
        }

        if (base) {
            me._materialBaseColor = base;
        }

        if (accent) {
            me._materialAccentColor = accent;
        }
    }
});
