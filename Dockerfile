FROM debian:stable-20221114

RUN apt-get update && apt-get install -y \
    build-essential\
    dbus \
    rfkill \
    libdbus-1-dev \
    libglib2.0-dev \
    python3-dbus \
    nano \
    curl \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# chadburn
WORKDIR /usr/src/chadburn-test
COPY ./src /usr/src/chadburn-test/src
COPY ./test/src /usr/src/chadburn-test/test/src
COPY ./package.json /usr/src/chadburn-test/package.json
COPY ./tsconfig.json /usr/src/chadburn-test/tsconfig.json
RUN npm install

# dbusmock
COPY ./test/dbusmock-git/python-dbusmock /usr/src/chadburn-test/python-dbusmock
COPY ./test/org.freedesktop.NetworkManager.conf /etc/dbus-1/system.d/org.freedesktop.NetworkManager.conf
COPY ./test/org.freedesktop.ModemManager1.conf /etc/dbus-1/system.d/org.freedesktop.ModemkManager1.conf

COPY ./start.sh /usr/src/chadburn-test/start.sh

CMD ["bash", "/usr/src/chadburn-test/start.sh"]
