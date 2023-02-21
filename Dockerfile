FROM debian:stable-20221114 as build

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

# install from private npm repo
WORKDIR /usr/src/chadburn
COPY ./.secrets /usr/src/chadburn/.secrets
COPY ./build.sh /usr/src/chadburn/build.sh
COPY ./package.json /usr/src/chadburn/package.json
RUN bash build.sh

# testing materials
FROM build

COPY --from=build /usr/src/chadburn/node_modules /usr/src/dbus-test/chadburn/node_modules
COPY --from=build /usr/src/chadburn/package.json /usr/src/dbus-test/chadburn/package.json

WORKDIR /usr/src/dbus-test
COPY ./test/python-dbusmock /usr/src/dbus-test/python-dbusmock
COPY ./test/start.sh /usr/src/dbus-test/start.sh
COPY ./test/org.freedesktop.NetworkManager.conf /etc/dbus-1/system.d/org.freedesktop.NetworkManager.conf
COPY ./test/org.freedesktop.ModemManager1.conf /etc/dbus-1/system.d/org.freedesktop.ModemkManager1.conf

CMD ["bash", "/usr/src/dbus-test/start.sh"]
