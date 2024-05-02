use strict;
use warnings;


use Mojolicious::Lite -signatures;
use Mojolicious::Lite;
use JSON;

use DBI;

my $database = "PassSys";
my $hostname = "localhost";
my $username = "PassSys";
my $password = "PassSys";

my $dsn = "DBI:mysql:database=$database;host=$hostname";

my $dbh = DBI->connect( $dsn, $username, $password );

use lib './';
use ModelUser;



get '/' => sub ($c) {

if ($c->session->{username} eq "") {
        $c->redirect_to('/SignIn&SignUp.html');
    }
    else {
        #$c->render( text => "Current user : " . $c->session->{username} );
    }
};


get '/createUser' => sub ($c) {
    my $username    = $c->param('username');
    my $email  = $c->param('email');
    my $password      = $c->param('password');

    my $s = new ModelUser();
    $s->setUser($username, $email, $password);
    $s->createUser($dbh);


    $c->res->headers->header( 'Access-Control-Allow-Origin' => '*' );

    $c->render(text => "Create row for $username - $email - $password");
};


get '/read' => sub ($c) {
      my $username = $c->param("username");
      my $password = $c->param("password");

    my $s = new ModelUser;


    $c->res->headers->header( 'Access-Control-Allow-Origin' => '*' );
    
    $c->render( text => $s->read( $dbh, $username, $password ) );
};


get '/checkUser' => sub ($c) {
    my $username = $c->param('username');
    my $entered_email = $c->param('email');

    my $s = new ModelUser;
    $c->res->headers->header( 'Access-Control-Allow-Origin' => '*' );
    
    $c->render( text => $s->readCheckUserz( $dbh, $entered_email,$username ) );
};



get '/resetPassword' => sub ($c) {
    my $reset_email = $c->param('email');

    my $s = new ModelUser;
    $c->res->headers->header( 'Access-Control-Allow-Origin' => '*' );
    
    $c->render( text => $s->readResetEmail( $dbh, $reset_email) );
};


get '/updatePassword' => sub ($c) {
    my $email       = $c->param('email');
    my $password     = $c->param('password');

    my $s = new ModelUser;

    $s->updateNewPassword($password);
    $s->updatePassword( $dbh, $email);

    $c->res->headers->header( 'Access-Control-Allow-Origin' => '*' );
    $c->render( text => "Update row... siri=$email" );

};

app->start;
