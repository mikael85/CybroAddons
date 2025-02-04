odoo.define('pos_product_creation.product_create_button', function(require) {
   'use strict';
   const PosComponent = require('point_of_sale.PosComponent');
   const ProductScreen = require('point_of_sale.ProductScreen');
   const { useListener } = require("@web/core/utils/hooks");
   const Registries = require('point_of_sale.Registries');
   const ajax = require('web.ajax');


   class ProductCreateButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }
         async onClick() {
            var self = this;
            const {
                confirmed,
                payload
            } = await this.showPopup('ProductCreatePopup', {
                title: this.env._t('POS Product Creation'),
                body: this.env._t('You can Create The product.'),
            });
            if (confirmed) {
                var product_category = payload[0];
                var product_name = payload[1];
                var product_reference = payload[2];
                var product_price = payload[3];
                var unit_measure = payload[4];
                var product_categories = payload[5];
                console.log(product_category, 'product_category')
                console.log(product_name, 'product_name')
                console.log(product_reference, 'product_reference')
                console.log(product_price, 'product_price')
                console.log(unit_measure, 'unit_measure')
                if (!product_name){
                    return this.showPopup('ErrorPopup', {
                      title: _('A Unit Of Measure Is Required'),
                    });
                }
                if (!unit_measure){
                    return this.showPopup('ErrorPopup', {
                      title: _('A Unit Of Measure Is Required'),
                    });
                }
                console.log(product_category,'-product category in rpc')
                console.log(product_name,'-product name in rpc')
                console.log(product_price,'-product price in rpc')
                console.log(product_reference,'-product product_reference in rpc')
                console.log(unit_measure,'-product unit_measure in rpc')
                console.log(product_categories,'-product product_categories in rpc')

                ajax.jsonRpc('/create_product', 'call', {
                    'category': product_category,
                    'name': product_name,
                    'price': product_price,
                    'product_reference': product_reference,
                    'unit_measure': unit_measure,
                    'product_categories': product_categories,

                }).then(function(response) {});
           }
        }
    }
    ProductCreateButton.template = 'ProductCreateButton';
    ProductScreen.addControlButton({
        component: ProductCreateButton,
        condition: function() {
            return this;
        },
        position: ['before', 'SetPricelistButton'],
    });

    Registries.Component.add(ProductCreateButton);

    return ProductCreateButton;
});