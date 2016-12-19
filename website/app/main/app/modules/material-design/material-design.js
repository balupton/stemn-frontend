angular.module('modules.material-design', [
    'ngMaterial',
    'ngMessages'
]);
angular.module('modules.material-design').


config(function($mdIconProvider, $mdThemingProvider) {

    $mdIconProvider
		.iconSet('action',				'assets/icons/material/action-icons.svg', 24)
		.iconSet('alert',				'assets/icons/material/alert-icons.svg', 24)
		.iconSet('av',				 	'assets/icons/material/av-icons.svg', 24)
		.iconSet('communication',		'assets/icons/material/communication-icons.svg', 24)
		.iconSet('content',				'assets/icons/material/content-icons.svg', 24)
		.iconSet('device',				'assets/icons/material/device-icons.svg', 24)
		.iconSet('editor',				'assets/icons/material/editor-icons.svg', 24)
		.iconSet('file',				'assets/icons/material/file-icons.svg', 24)
		.iconSet('hardware',			'assets/icons/material/hardware-icons.svg', 24)
		.iconSet('icons',				'assets/icons/material/icons-icons.svg', 24)
		.iconSet('image',				'assets/icons/material/image-icons.svg', 24)
		.iconSet('maps',				'assets/icons/material/maps-icons.svg', 24)
		.iconSet('navigation',			'assets/icons/material/navigation-icons.svg', 24)
		.iconSet('notification',		'assets/icons/material/notification-icons.svg', 24)
		.iconSet('social',				'assets/icons/material/social-icons.svg', 24)
		.iconSet('toggle',				'assets/icons/material/toggle-icons.svg', 24)



    // Configure URLs for icons specified by [set:]id.
    $mdIconProvider
        // AV ----------------------------------------------------------
        .icon('video-collection',
              '/assets/icons/av/svg/production/ic_video_collection_48px.svg')
		// NAVIGATION ----------------------------------------------------------
        .icon('menu',
              '/assets/icons/navigation/svg/production/ic_menu_48px.svg')
        .icon('more-v',
              '/assets/icons/navigation/svg/production/ic_more_vert_48px.svg')
        .icon('more-h',
              '/assets/icons/navigation/svg/production/ic_more_horiz_48px.svg')
        .icon('close',
              '/assets/icons/navigation/svg/production/ic_close_48px.svg')
        .icon('chevron-left',
              '/assets/icons/navigation/svg/production/ic_chevron_left_48px.svg')
        .icon('chevron-right',
              '/assets/icons/navigation/svg/production/ic_chevron_right_48px.svg')
        .icon('expand-more',
              '/assets/icons/navigation/svg/production/ic_expand_more_48px.svg')
        .icon('arrow-back',
              '/assets/icons/navigation/svg/production/ic_arrow_back_48px.svg')
        // SOCIAL --------------------------------------------------------------
        .icon('notification',
              '/assets/icons/social/svg/production/ic_notifications_48px.svg')
        .icon('share',
              '/assets/icons/social/svg/production/ic_share_48px.svg')
        .icon('person',
              '/assets/icons/social/svg/production/ic_person_48px.svg')
        .icon('location-city',
              '/assets/icons/social/svg/production/ic_location_city_48px.svg')
        .icon('public',
              '/assets/icons/social/svg/production/ic_public_48px.svg')
        // CONTENT -------------------------------------------------------------
        .icon('add',
              '/assets/icons/content/svg/production/ic_add_48px.svg')
        .icon('add-circle',
              '/assets/icons/content/svg/production/ic_add_circle_48px.svg')
        .icon('add-circle-outline',
              '/assets/icons/content/svg/production/ic_add_circle_outline_48px.svg')
        .icon('remove',
              '/assets/icons/content/svg/production/ic_remove_48px.svg')
        .icon('reply',
              '/assets/icons/content/svg/production/ic_reply_48px.svg')
        .icon('sort',
              '/assets/icons/content/svg/production/ic_sort_24px.svg')
        .icon('link',
              '/assets/icons/content/svg/production/ic_link_48px.svg')
        // COMMUNICATION -------------------------------------------------------
		.icon('messenger',
              '/assets/icons/communication/svg/production/ic_messenger_48px.svg')
		// HARDWARE -------------------------------------------------------
		.icon('move-up',
              '/assets/icons/hardware/svg/production/ic_keyboard_capslock_24px.svg')
        .icon('memory',
              '/assets/icons/hardware/svg/production/ic_memory_48px.svg')
        // ACTION --------------------------------------------------------------
        .icon('assignment',
              '/assets/icons/action/svg/production/ic_assignment_48px.svg')
        .icon('bug-report',
              '/assets/icons/action/svg/production/ic_bug_report_48px.svg')
        .icon('done',
              '/assets/icons/action/svg/production/ic_done_48px.svg')
        .icon('exit_to_app',
              '/assets/icons/action/svg/production/ic_exit_to_app_48px.svg')
        .icon('help',
              '/assets/icons/action/svg/production/ic_help_48px.svg')
        .icon('settings',
              '/assets/icons/action/svg/production/ic_settings_48px.svg')
        .icon('search',
              '/assets/icons/action/svg/production/ic_search_48px.svg')
        .icon('visibility',
              '/assets/icons/action/svg/production/ic_visibility_48px.svg')
        .icon('visibility-off',
              '/assets/icons/action/svg/production/ic_visibility_off_48px.svg')
		.icon('lock-outline',
              '/assets/icons/action/svg/production/ic_lock_outline_24px.svg')
        .icon('open_in_new',
              '/assets/icons/action/svg/production/ic_open_in_new_24px.svg')
        .icon('label',
              '/assets/icons/action/svg/production/ic_label_24px.svg')
        .icon('home',
              '/assets/icons/action/svg/production/ic_home_24px.svg')
        .icon('swap_horiz',
              '/assets/icons/action/svg/production/ic_swap_horiz_24px.svg')
        // ALERY ---------------------------------------------------------------
        .icon('error',
              '/assets/icons/alert/svg/production/ic_error_48px.svg')
        // TOGGLE --------------------------------------------------------------
        .icon('checkbox',
              '/assets/icons/toggle/svg/production/ic_check_box_48px.svg')
        .icon('star-o',
              '/assets/icons/toggle/svg/production/ic_star_outline_24px.svg')
        .icon('star',
              '/assets/icons/toggle/svg/production/ic_star_24px.svg')
        // FILE ----------------------------------------------------------------
        .icon('upload',
              '/assets/icons/file/svg/production/ic_file_upload_48px.svg')
        .icon('download',
              '/assets/icons/file/svg/production/ic_file_download_48px.svg')
        .icon('create_new_folder',
              '/assets/icons/file/svg/production/ic_create_new_folder_48px.svg')
        .icon('folder',
              '/assets/icons/file/svg/production/ic_folder_48px.svg')
        // EDITOR --------------------------------------------------------------
        .icon('edit',
              '/assets/icons/editor/svg/production/ic_mode_edit_48px.svg')
		.icon('insert-photo',
              '/assets/icons/editor/svg/production/ic_insert_photo_48px.svg')
		.icon('section-move',
              '/assets/icons/editor/svg/production/ic_format_line_spacing_24px.svg')
		.icon('functions',
              '/assets/icons/editor/svg/production/ic_functions_24px.svg')
        // DEVICE --------------------------------------------------------------
        .icon('access-time',
              '/assets/icons/device/svg/production/ic_access_time_24px.svg')
        .icon('gps-fixed',
              '/assets/icons/device/svg/production/ic_gps_fixed_48px.svg')
        // OTHER ---------------------------------------------------------------
        .icon('up-o',
              '/assets/icons/other/up_outline_24px.svg')
        .icon('up',
              '/assets/icons/other/up_24px.svg')
        .icon('down-o',
              '/assets/icons/other/up_outline_24px.svg')
        .icon('down',
              '/assets/icons/other/up_24px.svg')
        .icon('twitter',
              '/assets/icons/other/twitter_24px.svg')
        .icon('twitter-filled',
              '/assets/icons/other/twitter_filled_24px.svg')
        .icon('linkedin',
              '/assets/icons/other/linkedin_24px.svg')
        .icon('facebook',
              '/assets/icons/other/facebook_24px.svg')
        .icon('facebook-filled',
              '/assets/icons/other/facebook_filled_24px.svg')
        .icon('heart',
              '/assets/icons/other/heart_24px.svg')
        .icon('heart-filled',
              '/assets/icons/other/heart_filled_24px.svg')
        .icon('response',
              '/assets/icons/other/response_24px.svg')
        .icon('response-filled',
              '/assets/icons/other/response_filled_24px.svg')
        .icon('dropbox',
              '/assets/icons/other/dropbox_24px.svg')
        .icon('drive',
              '/assets/icons/other/drive_24px.svg')
		// Editor layouts
	    .icon('layout-left',
              '/assets/icons/other/editor-layout-left.svg')
		.icon('layout-right',
              '/assets/icons/other/editor-layout-right.svg')
		.icon('layout-center',
              '/assets/icons/other/editor-layout-center.svg')
		.icon('layout-full-width',
              '/assets/icons/other/editor-layout-full-width.svg')
		.icon('layout-full-width-banner',
              '/assets/icons/other/editor-layout-full-width-banner.svg')
		.icon('layout-full-width-banner-text',
              '/assets/icons/other/editor-layout-full-width-banner-text.svg')
		.icon('layout-wide',
              '/assets/icons/other/editor-layout-wide.svg')
        // Compare
	    .icon('compare-side',
              '/assets/icons/other/compare/side-by-side.svg')
		.icon('compare-onion',
              '/assets/icons/other/compare/onion-skin.svg')
		.icon('compare-slide',
              '/assets/icons/other/compare/slide.svg')
		.icon('compare-top',
              '/assets/icons/other/compare/top-bottom.svg')
        .icon('compare-single',
              '/assets/icons/other/compare/single.svg')

    var stemnGreen = $mdThemingProvider.extendPalette('light-green', {
        'contrastDefaultColor': 'dark',
        'contrastLightColors': ['500']
    });
    // Register the new color palette map
    $mdThemingProvider.definePalette('stemnGreen', stemnGreen);

    $mdThemingProvider.theme('default')
        .accentPalette('stemnGreen', {
            'default': '500',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100',
        });
	$mdThemingProvider.theme('warn')
		.primaryPalette('red')
    $mdThemingProvider.theme('orange')
		.primaryPalette('orange')
    $mdThemingProvider.theme('default')
        .accentPalette('stemnGreen', {
            'default': '500',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100',
        })
        .primaryPalette('grey', {
            'default': '500',
            'hue-1': '500',
            'hue-2': '500',
            'hue-3': '500',
        })
}).

directive('mdContainer', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude : true,
        template: '<div layout="row" layout-align="center"><div layout="column" class="md-content-container" ng-transclude></div></div>',
        // Use class 'md-sm' to make a smaller container
    };
}).

run(function ($rootScope, $mdDialog) {
    // Close dialogs on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        // set state.dialog to true of dialogs should NOT close on success load.
        if(!toState.dialog){
            $mdDialog.cancel()
        }
    });
});




//// NOT WORKING ---------- Icon Morph
//directive('mdMorphIcon', function ($mdIcon) {
//    return {
//        restrict: 'A',
//        link: function(scope, element, attr) {
//
//            var iconElement
//
//            var replace = function(newicon) {
//                console.log(iconElement)
//                console.log(newicon)
//                new SVGMorpheus(iconElement).to(newicon);
//                iconElement = newicon;
//            }
//
//            // watch for any changes
//            var changeCount = 0;
//            attr.$observe('mdMorphIcon', function(newicon) {
//                console.log(newicon)
//                $mdIcon(newicon).then(function(newiconEl){
//                    if(changeCount === 0){
//                        iconElement = newiconEl;
//                        element.append(newiconEl);
//                    }
//                    else{
//                        replace(newiconEl)
//                    }
//                    changeCount++
//                });
//            });
//
//        }
//    };
//});
