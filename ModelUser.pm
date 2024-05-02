use strict;
use warnings;
use JSON;
use Mojolicious::Lite;


package ModelUser;


sub new {
    my $class = shift @_;
    return bless {
        "username"  => "???",
        "email"     => "???",
        "password" => "???"
    }, $class;
}


sub setUser {
  my $this = shift @_;
  
  my $username = shift @_;
  my $email = shift @_;
  my $password = shift @_;
  
  $this->{'username'} = $username;
  $this->{'email'} = $email;
  $this->{'password'} = $password;
  
}


sub updateNewPassword {
  my $this = shift @_;
  
  my $Newpassword = shift @_;
  $this->{'password'} = $Newpassword;
  
}



sub createUser {

    my $this = shift @_;
    my $dbh = shift @_;
    my $sth = undef;
    
    if ($sth = $dbh->prepare('INSERT INTO user(username, email, password) values (?, ?, password(?))')) {
        if ($sth->execute($this->{'username'}, $this->{'email'},$this->{'password'})) {
            print "Success create new user...\n";
        } else {
            print "Error: $dbh->errstr()\n";
        }
    } else {
        print "Error: $dbh->errstr()\n";
    }
}



sub read {
    my $this = shift @_;
    
    my $dbh = shift @_;
    my $username = shift @_;
    my $password = shift @_;
    # print "Values: username=$username, password=$password\n";
    my $sth = undef; 
        if ($sth = $dbh->prepare('SELECT * FROM user WHERE username=? AND  password=password(?)')) {

            if ($sth->execute($username, $password)) {
                        my $ref = $sth->fetchrow_hashref();        
                        if ($ref) {
                            return JSON->new->pretty->encode($ref);
                        } else {
                             return undef;
                                  
                        }

                    } else {
                        # SQL execution error
                        return JSON->new->pretty->encode({ error => $dbh->errstr() });
                    }
        }    
        else {
            print "Error: $dbh->errstr()\n";
        }  
}




sub readCheckUserz {
    my $this = shift @_;
    
    my $dbh = shift @_;
    my $email = shift @_;
    my $username = shift @_;
    # print "Values: username=$username, password=$password\n";
    my $sth = undef; 
        if ($sth = $dbh->prepare('SELECT COUNT(*) FROM user WHERE email = ? OR username = ?')) {

            if ($sth->execute($email, $username)) {
            my ($count) = $sth->fetchrow_array;
            $sth->finish();  
            return $count;     
                          
   
                    } else {
                        # SQL execution error
                        return JSON->new->pretty->encode({ error => $dbh->errstr() });
                    }
        }    
        else {
            print "Error: $dbh->errstr()\n";
        }  
}



sub readResetEmail {
    my $this = shift @_;
    my $dbh = shift @_;
    my $email = shift @_;
#    print "Values: Email APA?=$email";
    my $sth = undef; 
        if ($sth = $dbh->prepare('SELECT COUNT(*) FROM user WHERE email = ?')) {

            if ($sth->execute($email)) {
            my ($count) = $sth->fetchrow_array;
            $sth->finish();  
            return $count;     
                          
                    } else {
                        # SQL execution error
                        return JSON->new->pretty->encode({ error => $dbh->errstr() });
                    }
        }    
        else {
            print "Error: $dbh->errstr()\n";
        }  
}


sub updatePassword {
    my $this = shift @_;
    
    my $dbh = shift @_;
    my $email = shift @_;
    my $sth = undef;

    print "PASSWORDDDD= {'password'}\n";
    
    if ($sth = $dbh->prepare('UPDATE user SET password=password(?) WHERE email=?')) {
        if ($sth->execute($this->{'password'}, $email)) {
            print "Success update user password...\n";
        } else {
            print "Error: $dbh->errstr()\n";
        }
    } else {
        print "Error: $dbh->errstr()\n";
    }
}

return 1;






