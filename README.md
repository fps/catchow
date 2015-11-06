# catchow

capcha + POW (proof of work) = capchow -> catchow 'cause "Meow!" - A general mechanism to protect services from abuse using POW. NodeJS example implementation included

# What?

* You have a service (e.g. a wiki, or a message form for comments in a webpage, or a web service that calculates something) and you want to make it available without a pesky, lengthy signup process
* You do not want this service to be abused (by spammers, leechers, etc.)
* The solution: Make users spend work to access your service and send proof to you that they actually did the work: This is known as Proof-of-Work, or <code>pow</code> for short

# How?

Very simple:

Let's say you have a webservice accepting <code>POST</code> requests on an URI <code>$URI</code>. Simply make the user of the API send along a random number in the <code>POST</code> request. But not any old number. It has to be a number that, for example, hashes to a hash with a prefix that you required beforehand. 

So before sending their <code>POST</code> the client has to first perform a <code>GET</code> on, for example, the URI <code>$URI/challenge</code>. The server picks a random number and hashes it giving, for example, the hash <code>$HASH</code>. It sends the first <code>n</code> bits of this hash to the client in the response to the <code>GET</code>. We call these first <code>n</code> bits the <code>$PREFIX</code>. The client now starts drawing random numbers and hashes them until he has found one with a hash that starts with the given <code>$PREFIX</code>.

Now the client can send this random number along with their <code>POST</code> request. All the server has to do is to rehash the random number sent along by the client, check if the hash's <code>$PREFIX</code> matches the one it challenged the client with and if that's the case, accept the <code>POST</code>.

# Um, our service doesn't speak <code>HTTP</code>

Doh, it's a general principle. Think about it a little bit...

# Erm, we have users that we trust

For those users, offer a way to prove that they are the ones you trust, i.e. authentication. Do not require solving a challenge from those.

# Example chat service

Work in progress..

