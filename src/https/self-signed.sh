openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
openssl req -new -x509 -key private.key -out certificate.crt -days 365 -subj "/C=US/ST=YourState/L=YourCity/O=YourOrganization/CN=localhost"
