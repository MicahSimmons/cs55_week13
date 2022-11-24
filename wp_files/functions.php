<?php
add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
function enqueue_parent_styles() {
	wp_enqueue_style( 'twentytwentytwo-child-style',
		get_stylesheet_uri(),
		array( 'twentytwentytwo-style' ),
		wp_get_theme()->get( 'Version' ) // This only works if you have Version defined in the style header.
	);
}

add_action('rest_api_init', function () {
  register_rest_route( 'twentytwentytwo-child/v1', 
                       'latest-posts/(?P<category_id>\d+)',
                       array(
                        'methods' => 'GET',
                        'callback' => 'get_latest_posts_by_catagory'
                       )
                     );

  register_rest_route( 'twentytwentytwo-child/v1', 
                       'contacts',
                       array(
                        'methods' => 'GET',
                        'callback' => 'get_contacts_list'
                       )
                     );
});

function get_latest_posts_by_catagory($request) {
    $args = array(
        'category' => $request['category_id']
    );

    $posts = get_posts($args);

    if (empty($posts)) {
        return new WP_Error( 'empty_category', 
                             'There are no posts to display',
                             array('status' => 404) );
    }

    $response = new WP_REST_Response($posts);
    $response->set_status(200);
    return $response;
}

// Week 13:  Add custom post types
function add_custom_post_types () {
    /* Create a "contact" */
    register_post_type( 
        'contact',
        array(
            'labels' => array(
                'name' => __('Contacts', 'textdomain'),
                'singular_name' => __('Contact', 'textdomain')
            ),
            'public' => true,
            'has_archive' => true
        )
    );

    register_post_type( 
        'product',
        array(
            'labels' => array(
                'name' => __('Products', 'textdomain'),
                'singular_name' => __('Product', 'textdomain')
            ),
            'public' => true,
            'has_archive' => true
        )
    );
}

add_action('init', 'add_custom_post_types');

function get_contacts_list () {
    global $wpdb;
    $query = 'SELECT id, post_type, post_title, post_status, '
           . '       GROUP_CONCAT(wp_postmeta.meta_key, ":", REPLACE(wp_postmeta.meta_value, ":", "")) AS acf_fields '
           . '       FROM wp_posts '
           . 'INNER JOIN wp_postmeta '
           . '        ON id=wp_postmeta.post_id '
           . 'WHERE post_status="publish" '
           . '  AND post_type="contact" '
           . '  AND wp_postmeta.meta_key NOT LIKE "\_%" '
           . 'GROUP BY wp_posts.id '
           ;
    $results = $wpdb->get_results($query);
    return $results;
}