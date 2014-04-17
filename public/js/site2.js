//doc ready
$(function(){

    var
        $window   = $(window),
        $document = $(document),
        $body     = $('body'),
        $content  = $('#content')
    ;

    // $('.responsive-text').fitText();

    if($content.hasClass('stack')){

        $('[data-spy="pin"]').each(function(){
            var $self = $(this);
            $self.data('offsetTop', $self.offset().top);
        });

        $window.on('scroll', function(){
            var scrollTop = $window.scrollTop();

            $('[data-spy="pin"]').each(function(){
                var $self = $(this);

                if( $self.data('offsetTop') <= scrollTop ){
                    $self.addClass('pinned');
                } else {
                    $self.removeClass('pinned');
                }
            });
        });

    } else {
        stroll.bind($content);
    }

    $('[data-toggle="drawer"]').on('click', function(e){
        e.preventDefault();

        var
            section   = $(this).attr('href'), 
            $el       = $( section ),
            $projects = $('#projects'),
            bg        = $('#drawerBg')
        ;
        
        
        $projects.addClass('pinned');
        $('[data-spy="pin"]').not($projects).removeClass('pinned');

        $('.drawer').not($el).hide();
        $el.fadeIn();

        bg
            .fadeOut('fast', function(){
                bg
                    .removeClass('taxi1 taxi2 freight drive1 drive2 diesel bioDiesel source greenhouse volkerLofts grandCherokee citySpirit freightResidences')
                    .addClass( section.replace('#', '') )
                    .fadeIn('fast')
                ;
            })
        ;

        return false;
    });
    

    $('#scrollDown').on('click', function(e){
        e.preventDefault();

        $('body').animate({
            scrollTop: $('#intro').outerHeight()
        });

        return false;
    });

});//end doc ready